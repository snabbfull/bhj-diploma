/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const select = this.element.querySelector('select[name="account_id"]');
    if (!select) {
      return;
    }

    Account.list(null, (err, response) => {
      if (response && response.success) {
        select.innerHTML = response.data.reduce((html, account) => {
          return html + `<option value="${account.id}">${account.name}</option>`;
        }, '');
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
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