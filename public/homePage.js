const logoutButton = new LogoutButton();

logoutButton.action = () => {
	const callback = (response) => {
		if (response.success) {
			location.reload();
		}
	};
	ApiConnector.logout(callback);
}

//Получение информации о пользователе
ApiConnector.current((response) => {
	if(response.success) {
		ProfileWidget.showProfile(response.data);
	}
})

//Получение нужных курсов валют
const ratesBoard = new RatesBoard();

const updateRatesBoard = () => {
  ApiConnector.getStocks((response) => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
  });
}
updateRatesBoard();

setInterval(() => {
    updateRatesBoard();
}, 60000);

//операции с деньгами
const moneyManager = new MoneyManager();

//Добавление денег
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (response) => {
		if(response.success) {
			ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'успешно');
		} else {
			moneyManager.setMessage(response.error, 'ошибка');
		}
	})
}

//Конвертация валюты
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'успешно');
		} else {
			moneyManager.setMessage(response.error, 'ошибка');
		}
	})
}

//Отправка денег
moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if(response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'успешно');
		} else {
			moneyManager.setMessage(response.error, 'ошибка');
		}
	})
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

//получение избранных
ApiConnector.getFavorites = (data) => {
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		}
}

//добавление в избранное
favoritesWidget.addUserCallback = (data)  => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, 'успешно');
		} else {
			favoritesWidget.setMessage(response.error, 'ошибка');
		}
	})
}

//удаление из избранного

favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if(response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, 'успешно');
		} else {
			favoritesWidget.setMessage(response.error, 'ошибка');
		}
	})
}
