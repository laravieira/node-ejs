var template = {}

function preloadEjsTemplate() {
  fetch('/views/components/people.ejs')
    .then(response => response.text())
    .then(response => {
      template = {
        ...template,
        'people': response
      }
      console.debug('Template loaded:', 'people')
    })
    .catch(console.error)
}

function updatePeopleList(people) {
  const list = document.getElementById('people')
  list.innerHTML = ejs.render(template.people, { people })
}

function updateQuery(amount) {
  const query = new URLSearchParams({ amount: `${amount}` })
  // doesn't reload the page, only updates the URL to reflect the current state
  window.history.replaceState({}, '', `?${query}`)
}

function updateNumberInput() {
  const amount = new URLSearchParams(window.location.search).get('amount') || 5
  document.querySelector('input[name=amount]').value = amount
}

function onNumberChange(amount) {
  console.debug('Amount changed:', amount)

  const query = new URLSearchParams({ amount: `${amount}` })

  fetch(`/people?${query.toString()}`)
    .then(response => response.json())
    .then(people => {
      updateQuery(people.length)
      updatePeopleList(people)
    })
    .catch(console.error)
}

// register change event listener for amount input
document.querySelector('input[name=amount]')
  .addEventListener('input', (event) => onNumberChange(event.currentTarget.value))

// preload ejs templates for client-side rendering
preloadEjsTemplate()

// update number input on page load
updateNumberInput()
