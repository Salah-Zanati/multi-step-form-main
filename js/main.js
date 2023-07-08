/** @format */
let stepNum = 1,
	activeStep = document.querySelector(`.steps-form .s-${stepNum}`),
	steps = document.querySelectorAll(".steps-form .step"),
	nextBtn = document.getElementById("next"),
	backBtn = document.getElementById("back"),
	serveces = document.querySelector(".s-4 .serveces");
let planAmount = document.getElementById("planAmount"),
	planPrice = document.querySelectorAll(".s-2 .plan-price"),
	plans = document.querySelectorAll(".s-2 .plan"),
	planAmountBox = document.querySelector(".s-2 .plan-amount");
let ons = document.querySelectorAll(".s-3 .on"),
	onPrice = document.querySelectorAll(".s-3 .on .on-price");
let nameInput = document.getElementById("name"),
	emailInput = document.getElementById("email"),
	phoneNumberInput = document.getElementById("phoneNumber");
// steps toggle
activeStep.classList.add("active");
// to gather the information
let planAmountInfo = {
	yearly: { arcade: 90, advanced: 120, pro: 150, free: "2 months free" },
	monthly: { arcade: 9, advanced: 12, pro: 15 },
};
let onsInfo = {
	yearly: {
		"Online service": 10,
		"Larger storage": 20,
		"Customizable profile": 20,
	},
	monthly: {
		"Online service": 1,
		"Larger storage": 2,
		"Customizable profile": 2,
	},
};
let info = {
	theName: "",
	email: "",
	phone: "",
	planType: "arcade",
	planDuration: "monthly",
	ons: [],
};
nextBtn.onclick = () => {
	if (stepNum > 5) return;
	if (stepNum == 1) {
		let error;
		checkOnEmail =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				emailInput.value
			);
		if (checkOnEmail) {
			error = false;
			document
				.querySelector(`.s-1 .inputs label[for="${emailInput.id}"]`)
				.classList.remove("error");
		} else {
			error = true;
			document
				.querySelector(`.s-1 .inputs label[for="${emailInput.id}"]`)
				.classList.add("error");
		}
		error = checkOnEmail ? false : true;

		checkOnName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(
			nameInput.value
		);
		if (checkOnEmail) {
			error = false;
			document
				.querySelector(`.s-1 .inputs label[for="${nameInput.id}"]`)
				.classList.remove("error");
		} else {
			error = true;
			document
				.querySelector(`.s-1 .inputs label[for="${nameInput.id}"]`)
				.classList.add("error");
		}
		error = checkOnName ? false : true;

		if (phoneNumberInput.value === "") {
			document
				.querySelector(`.s-1 .inputs label[for="${phoneNumberInput.id}"]`)
				.classList.add("error");
			error = true;
		} else
			document
				.querySelector(`.s-1 .inputs label[for="${phoneNumberInput.id}"]`)
				.classList.remove("error");
		if (error) return;
		info.theName = nameInput.value;
		info.email = emailInput.value;
		info.phone = phoneNumberInput.value;
	}
	if (stepNum == 3) {
		info.ons = [];
		document.querySelectorAll(".s-3 label.active").forEach((on) => {
			info.ons.push(on.querySelector(".on-title").textContent);
		});
	}
	stepNum++;
	if (stepNum == 4) {
		document.querySelectorAll(`.s-4 .serveces .servese`).forEach((s) => {
			s.remove();
		});
		let totalPrice = 0;
		let duration = info.planDuration == "monthly" ? "mo" : "yr";
		let plan = serveces.querySelector(".plan");
		plan.querySelector(".name-amount .name").textContent = info.planType;
		plan.querySelector(".name-amount .amount").textContent = info.planDuration;
		plan.querySelector(".price .num").textContent =
			planAmountInfo[info.planDuration][info.planType];
		totalPrice += parseInt(planAmountInfo[info.planDuration][info.planType]);
		plan.querySelector(".price .amount").textContent = duration;
		for (let i = 0; i < info.ons.length; i++) {
			let div = document.createElement("div");
			div.className = "servese";
			div.innerHTML = `
						<p class="serv-name">${info.ons[i]}</p>
						<p class="serv-price">$<span class="num">${
							onsInfo[info.planDuration][info.ons[i]]
						}</span>/<span class="amount">${duration}</span></p>
				`;
			totalPrice += parseInt(onsInfo[info.planDuration][info.ons[i]]);
			document.querySelector(".s-4 .serveces").appendChild(div);
		}
		let total = document.querySelector(".s-4 .total");
		total.querySelector("p span").textContent =
			info.planDuration == "monthly" ? "month" : "year";
		total.querySelector(".total-price .num").textContent = totalPrice;
		total.querySelector(".total-price .amount").textContent = duration;
	}
	setActiveToLink();
	for (let i = 0; i < steps.length; i++) {
		steps[i].classList.remove("active");
	}
	document.querySelector(`.steps-form .s-${stepNum}`).classList.add("active");
};
backBtn.onclick = () => {
	if (stepNum <= 1) return;
	stepNum--;
	setActiveToLink();
	for (let i = 0; i < steps.length; i++) {
		steps[i].classList.remove("active");
	}
	document.querySelector(`.steps-form .s-${stepNum}`).classList.add("active");
};
function setActiveToLink() {
	console.log(stepNum);
	document.querySelectorAll(".steps-links .step-num").forEach((step) => {
		step.classList.remove("active");
	});
	if (stepNum <= 4) {
		document
			.querySelector(`.steps-links li:nth-child(${stepNum}) .step-num`)
			.classList.add("active");
	} else
		document
			.querySelector(`.steps-links li:nth-child(4) .step-num`)
			.classList.add("active");
}
// s-2

function planAmountState(isChecked) {
	if (isChecked) return "yearly";
	return "monthly";
}
function fillPlansField(state) {
	for (let i = 0; i < planPrice.length; i++) {
		planPrice[i].children.item(0).textContent = Object.values(
			planAmountInfo[`${state}`]
		)[i];
		planPrice[i].children.item(1).textContent = state == "yearly" ? "yr" : "mo";
		if (state == "yearly")
			planPrice[i].children.item(2).textContent = planAmountInfo.yearly.free;
		else planPrice[i].children.item(2).textContent = "";
	}
	info.planDuration = state;
}
fillPlansField(planAmountState(planAmount.checked));
planAmount.onchange = () => {
	fillPlansField(planAmountState(planAmount.checked));
	fillOnsField(planAmountState(planAmount.checked));
	planAmountBox.children.item(0).classList.toggle("active");
	planAmountBox.children.item(2).classList.toggle("active");
};
plans.forEach((p) => {
	p.addEventListener("click", function () {
		plans.forEach((p) => {
			p.classList.remove("active");
		});
		p.classList.add("active");
		console.log(p.children.item(1).children.item(0).textContent);
		info.planType = p.children.item(1).children.item(0).textContent;
		console.log(info);
	});
});
// s-3
ons.forEach((on) => {
	on.addEventListener("click", function () {
		if (on.children.item(0).checked) on.classList.add("active");
		else on.classList.remove("active");
	});
});
function fillOnsField(state) {
	for (let i = 0; i < onPrice.length; i++) {
		onPrice[i].children.item(0).textContent = Object.values(
			onsInfo[`${state}`]
		)[i];
		onPrice[i].children.item(1).textContent = state == "yearly" ? "yr" : "mo";
	}
}
fillOnsField(planAmountState(planAmount.checked));
// s-4
serveces.querySelector(".change").onclick = function (e) {
	for (let i = 0; i < steps.length; i++) {
		steps[i].classList.remove("active");
	}
	stepNum = 2;
	document.querySelector(`.steps-form .s-${stepNum}`).classList.add("active");
	setActiveToLink();
};