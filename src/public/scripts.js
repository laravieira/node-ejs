function updatePeopleList(people) {
  const list = document.getElementById('people')
  list.innerHTML = ''

  if(people.length === 0) {
    const item = document.createElement('div')
    item.classList.add('empty')
    item.innerHTML = `
      <h2>There is none.</h2>
    `
    list.appendChild(item)
    return
  }

  people.forEach(person => {
    const item = document.createElement('div')
    item.classList.add('person')
    item.style.animationDelay = `${person.id * 50}ms`
    item.innerHTML = `
      <span>${person.id}</span>
      <img src="${person.avatar}" alt="${person.name}" />
      <div>
        <h2>${person.name}</h2>
        <p>${person.job}</p>
        <p>${person.email}</p>
      </div>
    `
    list.appendChild(item)
  })
}

function updateQuery(amount) {
  const query = new URLSearchParams({ amount: `${amount}` })
  // doesn't reload the page, only updates the URL to reflect the current state
  window.history.replaceState({}, '', `?${query}`)
}

function updateNumberInput() {
  const amount = new URLSearchParams(window.location.search).get('amount') || 5
  document.getElementsByName('amount')
    .item(0)
    .value = amount
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

document.addEventListener('DOMContentLoaded', () => {
  updateNumberInput()
  document.getElementsByName('amount')
    .item(0)
    .addEventListener('input', (event) => {
      onNumberChange(event.currentTarget.value)
    })
})