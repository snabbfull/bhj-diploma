/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.update();
        const modal = this.element.closest('.modal');
        if (modal) {
          const modalKey = modal.getAttribute('data-modal-id');
          const modalInstance = App.getModal(modalKey);
          if (modalInstance) {
            modalInstance.close();
          }
        }
      }
    });
  }
}