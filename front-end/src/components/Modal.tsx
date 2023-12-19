type ModalProps = {
  closeModalHandler: () => void;
  onSubmitModalHandler: () => Promise<void>;
};

export default function Modal(props: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-body">
        <h3 className="modal-body-header">Видалити цю нотатку?</h3>
        <div className="modal-body-buttons">
          <button
            className="modal-body-buttons-button"
            onClick={() => {
              props.onSubmitModalHandler();
              props.closeModalHandler();
            }}
          >
            Так, видалити
          </button>
          <button
            className="modal-body-buttons-button"
            onClick={props.closeModalHandler}
          >
            Ні, закрити вікно
          </button>
        </div>
      </div>
    </div>
  );
}
