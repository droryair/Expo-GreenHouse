import { observable, action, makeObservable, computed } from "mobx"

export default class UtilityStore {
  constructor() {
    this.snackBar = { msg: "", isShown: false, duration: 3000 }
    this.loadingState = { isShown: false }
    this.emptyState = { msg: "", isShown: false, handleGoBack: null }
    this.serverUrl = "http://10.0.0.4:3001"
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
    this.snackBar.msg = msg
    this.snackBar.isShown = true
  }
  hideSnackBar = () => {
    this.snackBar.isShown = false
  }
  get isLoading() {
    this.loadingState.isShown
  }
  showLoadingState = () => {
    this.loadingState.isShown = true
  }
  hideLoadingState = () => {
    this.loadingState.isShown = false
  }
  get isEmpty() {
    this.emptyState.isShown
  }
  showEmptyState = (msg, handleGoBack) => {
    this.emptyState.msg = msg
    this.emptyState.isShown = true
    this.emptyState.handleGoBack = handleGoBack
  }
  emptyStateGoBack = () => {
    this.emptyState.isShown = false
    this.emptyState.handleGoBack()
  }
}
