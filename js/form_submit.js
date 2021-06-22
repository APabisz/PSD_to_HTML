document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact__form")
  const inputs = document.querySelectorAll(
    ".form__name, .form__phone, .form__email, .form__company, .form__message"
  )
  const selects = document.querySelectorAll(
    "#company-size-select, #company-income-select"
  )
  const checkbox = document.querySelector("#accept-privacy")

  const clearForm = () => {
    ;[...inputs].forEach((input) => (input.value = ""))
    ;[...selects].forEach((select) => (select.selectedIndex = 0))
    checkbox.checked = false
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    clearForm()

    const messageContainer = document.createElement("div")
    const message = document.createElement("p")

    const closeBtn = document.createElement("button")
    message.textContent =
      "Twój formularz został wysłany. Dziękujemy za zaufanie. Wkrótce się z Tobą skontaktujemy"
    message.classList = "msg__text"
    closeBtn.textContent = "Zamknij"
    closeBtn.classList = "msg__btn"

    messageContainer.appendChild(message)
    messageContainer.appendChild(closeBtn)

    messageContainer.classList = "msg"
    document.body.appendChild(messageContainer)

    const timeoutID = setTimeout(() => {
      document.body.removeChild(messageContainer)
    }, 5000)

    closeBtn.addEventListener("click", () => {
      document.body.removeChild(messageContainer)
      clearTimeout(timeoutID)
    })
  })
})
