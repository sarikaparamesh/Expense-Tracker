let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  const list = document.getElementById("list");
  const balanceEl = document.getElementById("balance");

  list.innerHTML = "";
  let balance = 0;

  transactions.forEach((t, index) => {
    balance += t.amount;

    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "income" : "expense");

    li.innerHTML = `
      ${t.desc} (${t.category}) ₹${t.amount}
    `;

    const btn = document.createElement("button");
    btn.innerText = "❌";

    btn.onclick = function () {
      transactions.splice(index, 1);
      saveData();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });

  balanceEl.innerText = balance;
}

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (desc === "" || amount === 0) {
    alert("Enter valid data");
    return;
  }

  transactions.push({ desc, amount, category });
  saveData();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

updateUI();