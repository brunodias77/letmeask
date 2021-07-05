import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import "../styles/room.scss";
import { RoomCode } from "../components/RoomCode";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

export function AdminRoom() {
  const history = useHistory();
  const params = useParams();
  const { user } = useAuth();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleCheckQuestionAsAnswered(questionId) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo do app" />
          <div>
            <RoomCode code={roomId} />
            <Button
              content="Encerrar Sala"
              isOutlined={true}
              onClick={handleEndRoom}
            ></Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((element) => (
            <Question
              content={element.content}
              author={element.author}
              key={element.id}
              isAnswered={element.isAnswered}
              isHighlighted={element.isHighlighted}
            >
              {!element.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(element.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighLightQuestion(element.id)}
                  >
                    <img src={answerImg} alt="Dar destaque para a pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(element.id)}
              >
                <img src={deleteImg} alt="Remover Pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
