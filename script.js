let myList = [
  { id: "fname", title: "fname", type: "text", DefaultValue: "firstname" },
  { id: "rr", title: "rr", type: "password", DefaultValue: "1" },
  { id: "ss", title: "ss", type: "password", DefaultValue: "1" },
  { id: "dd", title: "dd", type: "password", DefaultValue: "1" },
];

const formCreator = (myList) => {
  const formContainer = document.createElement("div");
  const form = document.createElement("form");
  formContainer.className = "formContainer";
  document.body.append(formContainer);
  formContainer.append(form);
  formContainer.append(form);
  myList.forEach((input) => {
    form.insertAdjacentHTML(
      "afterbegin",
      `
      <label for=${input.id}>
      ${input.title}
        <input value=${input.DefaultValue} name=${input.id} type=${input.type} id=${input.id}
      /></label>
  `
    );
  });
  form.insertAdjacentHTML(
    "beforeend",
    `
    <br><br>
   <input type="submit" />
  `
  );
};

const formDataToList = () => {
  let inputs = document.querySelectorAll("input");
  let dataListContainer = document.createElement("div");
  dataListContainer.className = "dataListContainer";
  let ul = document.createElement("ul");
  document.body.append(dataListContainer);
  dataListContainer.append(ul);
  let form = document.querySelector("form");
  let formData = new FormData(document.querySelector("form"));
  form.addEventListener("submit", (e) => {
    ul.innerHTML = "";
    e.preventDefault();
    for (let [key, valueForm] of formData.entries()) {
      inputs.forEach((input) => {
        if (input.id === key) {
          valueForm = input.value;
        }
      });
      ul.insertAdjacentHTML(
        "beforeend",
        `
      <li><div class="list__info"><span class="key key__value">key = ${key}</span><span class="value key__value">value = ${valueForm}</span></div><div><button class="list__btn">Delete</button></div></li>
      `
      );
    }
    let deleteBtns = document.querySelectorAll(".list__btn");
    deleteBtns.forEach((btn) => btn.addEventListener("click", deleteFunc));
    function deleteFunc(e) {
      let keyName =
        e.target.parentElement.parentElement.querySelector(
          ".list__info .key"
        ).innerHTML;
      formData.delete(keyName);
      e.target.parentElement.parentElement.remove();
    }
  });
};

formCreator(myList);

formDataToList();
