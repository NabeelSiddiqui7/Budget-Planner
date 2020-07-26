const incBlock = document.querySelector(".income-container");
const expBlock = document.querySelector(".expense-container");
const incBtn = document.querySelector(".add-inc");
const titleInput = document.querySelector(".add-title");
const amountInput = document.querySelector(".add-amount");
const totalInc = document.querySelector(".total-inc");
const totalExp = document.querySelector(".total-exp");
const savings = document.querySelector(".savings");
const incomes = [];
const expenses = [];
const budget = prompt("What is your budget?");
document.querySelector(".budget").innerHTML = `Budget: $${budget}`;
savings.innerHTML = `Savings: $${budget}`;

document.querySelector(".add-inc").addEventListener("click", () => {
  if (titleInput.value === "" || amountInput.value === "") {
    alert("Please enter all values");
  } else {
    createIncome(titleInput.value, amountInput.value);
    displayIncome();
    totalInc.innerHTML = `Total income: $${calcTotal(incomes)}`;
    totalExp.innerHTML = `Total expenses: $${calcTotal(expenses)}`;
    savings.innerHTML = `Savings: $${calcSavings()}`;
    clearInputs();
  }
});

document.querySelector(".add-exp").addEventListener("click", () => {
  if (titleInput.value === "" || amountInput.value === "") {
    alert("Please enter all values");
  } else {
    createExpense(titleInput.value, amountInput.value);
    displayExpense();
    totalInc.innerHTML = `Total income: $${calcTotal(incomes)}`;
    totalExp.innerHTML = `Total expenses: $${calcTotal(expenses)}`;
    savings.innerHTML = `Savings: $${calcSavings()}`;
    clearInputs();
  }
});

document
  .querySelector(".budget-container")
  .addEventListener("click", (event) => {
    if (event.target.id === "delete-btn") {
      const ID = event.target.parentNode.id;
      if (ID) {
        const splitString = ID.split("-");
        const type = splitString[0];
        const id = parseFloat(splitString[1]);
        deleteItem(type, id);
        console.log(incomes);

        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        savings.innerHTML = `Savings: $${calcSavings()}`;
      }
    }
  });

const createIncome = (incTitle, incValue) => {
  let IncID;
  if (incomes.length > 0) {
    IncID = incomes[incomes.length - 1].id + 1;
  } else {
    IncID = 0;
  }
  incomes.push({
    id: IncID,
    title: incTitle,
    value: incValue,
  });
};

const displayIncome = () => {
  const newInc = incomes[incomes.length - 1];
  incBlock.insertAdjacentHTML(
    "beforeend",
    `<div class="income" id="incomes-${newInc.id}"><p>${newInc.title}</p><p class="inc-value">$${newInc.value}</p><button id="delete-btn">x</button></div>`
  );
};

const createExpense = (expTitle, expValue) => {
  let expID;
  if (expenses.length > 0) {
    expID = expenses[expenses.length - 1].id + 1;
  } else {
    expID = 0;
  }
  expenses.push({
    id: expID,
    title: expTitle,
    value: expValue,
  });
};

const displayExpense = () => {
  const newExp = expenses[expenses.length - 1];
  expBlock.insertAdjacentHTML(
    "beforeend",
    `<div class="expense" id="expenses-${newExp.id}"><p>${newExp.title}</p><p class="exp-value">$${newExp.value}</p><button id="delete-btn">x</button></div>`
  );
};

const deleteItem = (type, id) => {
  let arr;
  if (type === "incomes") {
    arr = incomes;
  } else {
    arr = expenses;
  }
  const idArray = arr.map((cur) => {
    return cur.id;
  });
  const index = idArray.indexOf(id);

  if (index !== -1) {
    arr.splice(index, 1);
  }
};

const clearInputs = () => {
  titleInput.value = "";
  amountInput.value = "";
};

const calcSavings = () => {
  let totalInc = 0,
    totalExp = 0,
    savings;
  totalInc = calcTotal(incomes);
  totalExp = calcTotal(expenses);

  savings =
    Math.round(
      (parseFloat(budget) + totalInc - totalExp + Number.EPSILON) * 100
    ) / 100;
  return savings;
};

const calcTotal = (type) => {
  let total = 0;
  if (type.length === 0) {
    total = 0;
  } else {
    type.map((cur) => {
      total += parseFloat(cur.value);
    });
  }
  return total;
};
