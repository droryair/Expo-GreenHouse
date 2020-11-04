import { observable, action, makeObservable, computed } from "mobx"

export default class UtilityStore {
  constructor() {
    this.snackBar = { msg: "", isShown: false, duration: 3000 }
    this.loadingState = {
      isShown: false,
      title: "Loading..",
      msg: "Please wait",
      loader: 1,
    }
    this.emptyState = {
      msg: "No data to show here.",
      isShown: false,
      handleGoBack: null,
    }
    this.serverUrl = "http://192.168.1.11"
    makeObservable(this, {
      snackBar: observable,
      loadingState: observable,
      emptyState: observable,
      serverUrl: observable,
      isSnackBarShown: computed,
      showSnackBar: action,
      hideSnackBar: action,
      isLoading: computed,
      showLoadingState: action,
      hideLoadingState: action,
      isEmpty: computed,
      showEmptyState: action,
      emptyStateGoBack: action,
    })
  }
  get isSnackBarShown() {
    this.snackBar.isShown
  }
  showSnackBar(msg) {
    if (msg) {
      this.snackBar.msg = msg
      this.snackBar.isShown = true
    }
  }
  hideSnackBar = () => {
    this.snackBar.isShown = false
  }
  get isLoading() {
    this.loadingState.isShown
  }
  showLoadingState = (title, msg) => {
    if (msg) {
      this.loadingState.msg = msg
    }
    if (title) {
      this.loadingState.title = title
    }
    this.loadingState.loader = Math.floor(Math.random() * 4) + 1
    this.loadingState.isShown = true
  }
  hideLoadingState = () => {
    this.loadingState.isShown = false
  }
  get isEmpty() {
    this.emptyState.isShown
  }
  showEmptyState = (msg, handleGoBack) => {
    if (msg && handleGoBack) {
      this.emptyState.msg = msg
      this.emptyState.isShown = true
      this.emptyState.handleGoBack = handleGoBack
    }
  }
  emptyStateGoBack() {
    this.emptyState.isShown = false
    if (this.emptyState.handleGoBack) {
      this.emptyState.handleGoBack()
    }
  }
}
