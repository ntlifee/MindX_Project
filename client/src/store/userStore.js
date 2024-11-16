import { makeAutoObservable } from 'mobx';

export default class userStore {
	constructor() {
		this._isAuth = false;
		this._user = {};
		makeAutoObservable(this);
	}

	setIsAuth(value) {
		this._isAuth = value;
	}

	setUser(value) {
		this._user = value;
	}

	get isAuth() {
		return this._isAuth;
	}

	get user() {
		return this._user;
	}
}
