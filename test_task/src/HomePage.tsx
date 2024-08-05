import { useState } from "react";
import "./HomePage.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const HomePage = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [visibleNotif, setVisibleNotif] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setPhone("");
    setName("");
    setIsChecked(true);
    setVisibleNotif(false);
    setNotifTitle("");
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    let formattedValue = "+7 ";
    if (value.length > 1) {
      formattedValue += value.slice(1, 4);
    }
    if (value.length > 4) {
      formattedValue += " " + value.slice(4, 7);
    }
    if (value.length > 7) {
      formattedValue += " " + value.slice(7, 9);
    }
    if (value.length > 9) {
      formattedValue += "-" + value.slice(9, 11);
    }

    setPhone(formattedValue);
  };

  const sendData = async () => {
    if (!name || !phone) {
      setVisibleNotif(true);
      setNotifTitle("Заполните все поля!");
    } else if (!isChecked) {
      setVisibleNotif(true);
      setNotifTitle("Необходимо согласие на обработку персональных данных");
    } else {
      try {
        const formData = {
          name: name,
          phone: phone,
        };
        await axios.post("https://photopolaroid.ru/index.php", formData);
        setVisibleNotif(true);
        setNotifTitle("Сообщение успешно отправлено!");
      } catch (error) {
        setVisibleNotif(true);
        setNotifTitle("Произошла ошибка при отправке сообщения!");
      }
    }
  };

  return (
    <div className="home_page_container">
      <h1>Вакансия веб-программист</h1>
      <div className="desc">
        <div>
          Тестовое задание на должность Web-мастер/Младший Web-разработчик,
          создание
        </div>
        <div className="desc_modal_clc" onClick={() => setVisibleModal(true)}>
          формы обратной связи
        </div>
      </div>
      {visibleModal && (
        <div className="modal_feedback">
          <div className="modal_feedback_container">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <div className="modal_title">Обратный звонок</div>
            <div className="modal_content">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>

              <label htmlFor="phone" style={{ marginTop: "15px" }}>
                Номер телефона:
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={handleInputChange}
                placeholder="+7"
                maxLength={18}
              />

              {visibleNotif && <div className="notification">{notifTitle}</div>}

              <div className="checkbox_cont">
                <input
                  type="checkbox"
                  id="check1"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="check1">
                  <div className="checkbox-icon">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </label>
                <label htmlFor="check1" style={{ marginLeft: "5px" }}>
                  Согласиться на обработку персональных данных
                </label>
              </div>

              <button onClick={sendData} className="send_btn">
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
