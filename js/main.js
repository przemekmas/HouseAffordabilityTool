var yourMonthlyExpensesArray = new Array();
var partnerMonthlyExpensesArray = new Array();
var monthlyExpenseCount = 0;
var monthlyMortgageRepayments = 0;
var showPartnerEarnings = false;
var showPartnerMonthlyExpenses = false;
var showPartnerSavings = false;

function IsIE() {
	return window.document.documentMode;
}

// Create a parent container that wraps the expense name, value and delete button
function GetMainExpenseContainer(containerElementId) {
	var newInputContainerElement = document.createElement("div");
	newInputContainerElement.setAttribute("width", "100%");
	newInputContainerElement.setAttribute("id", containerElementId);
	newInputContainerElement.setAttribute("class", "row");
	newInputContainerElement.style.marginRight = "0px";
	newInputContainerElement.style.marginLeft = "0px";
	newInputContainerElement.style.marginBottom = "5px";
	return newInputContainerElement;
}

// Create the div container and an input element for the element name
function GetInputValueNameElement(inputMonthlyExpenseNameId) {
	var newInputValueNameDivElement = document.createElement("div");
	newInputValueNameDivElement.setAttribute("class", "monthly-expense-input col-sm-6")
	newInputValueNameDivElement.style.paddingRight = "5px";
	newInputValueNameDivElement.style.paddingLeft = "0px";

	var newInputNameElement = document.createElement("input");
	newInputNameElement.setAttribute("id", inputMonthlyExpenseNameId);
	newInputNameElement.setAttribute("class", "form-control");
	newInputNameElement.setAttribute("placeholder", "Expense Name");
	newInputNameElement.setAttribute("type", "text");
	newInputNameElement.style.display = "inline-block";
	newInputNameElement.value = "Expense Name";
	newInputNameElement.setAttribute("onfocus", "SelectInputValueNameText(\"" + inputMonthlyExpenseNameId + "\")");
	newInputValueNameDivElement.appendChild(newInputNameElement);
	return newInputValueNameDivElement;
}

// Create the div container and input element for the element value
function GetInputValueElement(monthlyExpenseId, placeholder) {
	var newInputValueMainDivElement = document.createElement("div");
	newInputValueMainDivElement.setAttribute("class", "main-currency-parent-container")

	var newInputValueOuterDivElement = document.createElement("div");
	newInputValueOuterDivElement.setAttribute("class", "form-control currency-parent-container");

	var newInputValueDivElement = document.createElement("div");
	newInputValueDivElement.setAttribute("class", "currency-container");
	var newInputValueSpanElement = document.createElement("span");
	newInputValueSpanElement.innerText = "£";
	newInputValueDivElement.appendChild(newInputValueSpanElement);

	var newInputValueElement = document.createElement("input");
	newInputValueElement.setAttribute("id", monthlyExpenseId);
	newInputValueElement.setAttribute("placeholder", placeholder);
	newInputValueElement.setAttribute("type", "text");
	newInputValueElement.setAttribute("onkeyup", "FormatInputValueToCurrency(\"" + monthlyExpenseId + "\")");
	newInputValueElement.setAttribute("onfocus", "SelectInputValueText(\"" + monthlyExpenseId + "\")");
	newInputValueElement.setAttribute("class", "currency-input");
	newInputValueElement.value = "0";

	newInputValueOuterDivElement.appendChild(newInputValueDivElement);
	newInputValueOuterDivElement.appendChild(newInputValueElement);
	newInputValueMainDivElement.appendChild(newInputValueOuterDivElement);

	return newInputValueMainDivElement;
}

// Create and return the delete button element
function GetDeleteButtonElement(monthlyExpenseContainerId, monthlyExpenseId, isPartner) {
	var closeButtonDivElement = document.createElement("div");
	closeButtonDivElement.setAttribute("class", "monthly-expense-input col-sm-2")

	var closeButtonElement = document.createElement("button");
	closeButtonElement.setAttribute("class", "btn btn-danger");
	closeButtonElement.setAttribute("onclick", "DeleteExpenseElement(\"" + monthlyExpenseContainerId + "\", \"" + monthlyExpenseId + "\", " + isPartner + ")");
	closeButtonElement.style.display = "inline-block";
	closeButtonElement.innerText = "Delete";
	closeButtonDivElement.appendChild(closeButtonElement);
	return closeButtonDivElement;
}

function GetSpanInformationElement(text) {
	var spanInformationDivElement = document.createElement("div");
	spanInformationDivElement.style.paddingRight = "5px";
	spanInformationDivElement.style.paddingLeft = "0px";
	spanInformationDivElement.style.height = "34px";

	var spanInformationElement = document.createElement("span");
	spanInformationElement.innerText = text;
	spanInformationElement.style.display = "inline-flex";
	spanInformationElement.style.alignItems = "center";
	spanInformationElement.style.height = "inherit";

	spanInformationDivElement.appendChild(spanInformationElement);

	return spanInformationDivElement;
}

function AddExpenseElement(mainElementId) {
	InternalAddExpenseElement(false, mainElementId);
}

function AddPartnerExpenseElement(mainElementId) {
	InternalAddExpenseElement(true, mainElementId);
}

function InternalAddExpenseElement(isPartner, mainElementId) {
	monthlyExpenseCount++;
	var monthlyExpenses = document.getElementById(mainElementId);
	var monthlyExpenseContainerId;
	var inputMonthlyExpenseId;
	var inputMonthlyExpenseNameId;
	var monthlyExpenseItems = new Array();

	if (isPartner) {
		monthlyExpenseContainerId = "PartnerMonthlyExpenseContainer" + monthlyExpenseCount;
		inputMonthlyExpenseId = "PartnerMonthlyExpense" + monthlyExpenseCount;
		inputMonthlyExpenseNameId = "PartnerMonthlyExpenseName" + monthlyExpenseCount;
		monthlyExpenseItems.push(inputMonthlyExpenseId);
		monthlyExpenseItems.push(inputMonthlyExpenseNameId);
		partnerMonthlyExpensesArray.push(monthlyExpenseItems);
	}
	else {
		monthlyExpenseContainerId = "MonthlyExpenseContainer" + monthlyExpenseCount;
		inputMonthlyExpenseId = "MonthlyExpense" + monthlyExpenseCount;
		inputMonthlyExpenseNameId = "MonthlyExpenseName" + monthlyExpenseCount;
		monthlyExpenseItems.push(inputMonthlyExpenseId);
		monthlyExpenseItems.push(inputMonthlyExpenseNameId);
		yourMonthlyExpensesArray.push(monthlyExpenseItems);
	}

	var newInputContainerElement = GetMainExpenseContainer(monthlyExpenseContainerId);
	var newInputValueNameDivElement = GetInputValueNameElement(inputMonthlyExpenseNameId);
	var newInputValueDivElement = GetInputValueElement(inputMonthlyExpenseId, "0");
	newInputValueDivElement.setAttribute("class", "monthly-expense-input col-sm-4");
	var closeButtonDivElement = GetDeleteButtonElement(monthlyExpenseContainerId, inputMonthlyExpenseId, isPartner);

	newInputContainerElement.appendChild(newInputValueNameDivElement);
	newInputContainerElement.appendChild(newInputValueDivElement);
	newInputContainerElement.appendChild(closeButtonDivElement);

	monthlyExpenses.appendChild(newInputContainerElement);
}

function AddMonthlyEarningsElement(mainContainerElementId, inputElementId, parentContainerElementId, text) {
	var monthlyEarnings = document.getElementById(parentContainerElementId);
	var mainContainer = GetMainExpenseContainer(mainContainerElementId);
	var informationElement = GetSpanInformationElement(text);
	var newInputValueDivElement = GetInputValueElement(inputElementId, "0");
	mainContainer.appendChild(informationElement);
	mainContainer.appendChild(newInputValueDivElement);
	monthlyEarnings.appendChild(mainContainer);
}

function CalculateMonthlyExpenses() {
	var monthlyExpenseTotalText = document.getElementById("MonthlyExpensesTotalId");
	var monthlyTotal = 0.00;

	for (i = 0; i < yourMonthlyExpensesArray.length; i++) {
		var expenseElement = document.getElementById(yourMonthlyExpensesArray[i]);
		var expenseValue = parseFloat(expenseElement.value);

		if (!isNaN(expenseValue)) {
			monthlyTotal += expenseValue;
		}
	}

	monthlyExpenseTotalText.innerHTML = "Total Monthly Expenses: £" + monthlyTotal;
}

function DeleteExpenseElement(elementId, monthlyExpenseElementId, isPartner) {
	var expenseElement = document.getElementById(elementId);
	expenseElement.remove();

	if (isPartner) {
		DeleteExpenseInputElements(partnerMonthlyExpensesArray, monthlyExpenseElementId);
	}
	else {
		DeleteExpenseInputElements(yourMonthlyExpensesArray, monthlyExpenseElementId);
	}
}

function DeleteExpenseInputElements(items, monthlyExpenseElementId) {
	var parentArrayIndex = -1;

	for (var i = 0; i < items.length; i++) {
		var index = items[i].indexOf(monthlyExpenseElementId);
		if (index > -1) {
			parentArrayIndex = i;
			break;
		}
	}

	if (parentArrayIndex > -1) {
		items.splice(parentArrayIndex, 1);

	}
}

function CreateVerticalTable(rows, columns, items, elementId) {

	var mainTable = document.createElement("table");
	mainTable.setAttribute("class", "summary-table");

	for (row = 0; row < rows; row++) {
		var tableRow = document.createElement("tr");

		for (col = 0; col < columns; col++) {
			var tableCell;

			if (col == 0) {
				tableCell = document.createElement("th");
			}
			else {
				tableCell = document.createElement("td");
				tableCell.setAttribute("class", "cell-text-right-adjust");
			}

			tableCell.innerText = items[row][col];
			tableRow.appendChild(tableCell);
		}
		mainTable.appendChild(tableRow)
	}

	var tableContainer = document.getElementById(elementId);
	tableContainer.appendChild(mainTable);
}

function CreateTable(rows, columns, items, elementId, hasHeading) {
	var mainTable = document.createElement("table");
	mainTable.setAttribute("class", "summary-table");

	for (row = 0; row < rows; row++) {
		var tableRow = document.createElement("tr");

		for (col = 0; col < columns; col++) {
			if (hasHeading == true && row == 0) {
				var tableCell = document.createElement("th");
			}
			else {
				var tableCell = document.createElement("td");
			}

			tableCell.innerText = items[row][col];
			tableRow.appendChild(tableCell);
		}
		mainTable.appendChild(tableRow)
	}

	var tableContainer = document.getElementById(elementId);
	tableContainer.appendChild(mainTable);
}

function GetNumberFromText(text) {
	var newText = text;
	for (var i = 0; i < newText.length; i++) {
		if (newText[i] == ",") {
			newText = newText.replace(",", "");
		}
	}

	return Number(newText);
}

function GetUKCurrencyFormatForValue(value) {
	var convertedValue = GetNumberFromText(value);

	var currencyValue = (convertedValue).toLocaleString('en-GB', {
		currency: 'GBP'
	});
	return currencyValue;
}

function FormatInputValueToCurrency(elementId) {
	var inputElementValue = document.getElementById(elementId);

	var finalValue = 0;
	for (var i = 0; i < inputElementValue.value.length; i++) {
		if (!isNaN(inputElementValue.value[i])) {
			finalValue += inputElementValue.value[i];
		}
	}

	var newInputValue = GetUKCurrencyFormatForValue(finalValue);
	inputElementValue.value = newInputValue;
}

function SelectInputValueText(elementId) {
	var inputElementValue = document.getElementById(elementId);
	if (inputElementValue.value == 0) {
		inputElementValue.select();
	}
}

function SelectInputValueNameText(elementId) {
	var inputElementValueName = document.getElementById(elementId);
	if (inputElementValueName.value == "Expense Name") {
		inputElementValueName.select();
	}
}

function AddFancyDescription(elementId, mainElementId, description) {
	var mainElement = document.getElementById(mainElementId);

	var containerElement = document.createElement("div");
	containerElement.setAttribute("id", elementId);
	var descriptionElement = document.createElement("h4");
	descriptionElement.innerText = description;
	containerElement.appendChild(descriptionElement);
	mainElement.appendChild(containerElement);
}

function RemoveMultipleElements(elements) {
	for (var i = 0; i < elements.length; i++) {
		var element = document.getElementById(elements[i]);
		element.remove();
	}
}

// Partner Monthly earnings start
function RemovePartnerMonthlyEarningsElement() {
	var addButton = document.getElementById("AddPartnerMonthlyEarningId");
	var removeButton = document.getElementById("RemovePartnerMonthlyEarningId");
	removeButton.style.display = "none";
	addButton.style.display = "block";

	var partnerMonthlyEarningsContainer = document.getElementById("PartnerMonthlyEarningsId");
	partnerMonthlyEarningsContainer.style.display = "none";
	showPartnerEarnings = false;
}

function AddPartnerMonthlyEarningsElement() {
	var addButton = document.getElementById("AddPartnerMonthlyEarningId");
	var removeButton = document.getElementById("RemovePartnerMonthlyEarningId");
	addButton.style.display = "none";
	removeButton.style.display = "block";
	var partnerMonthlyEarningsContainer = document.getElementById("PartnerMonthlyEarningsId");
	partnerMonthlyEarningsContainer.style.display = "block";
	showPartnerEarnings = true;
}

function AddPartnerMonthlyExpensesElement() {
	var addButton = document.getElementById("AddPartnerMonthlyExpensesId");
	var removeButton = document.getElementById("RemovePartnerMonthlyExpensesId");
	addButton.style.display = "none";
	removeButton.style.display = "block";
	var partnerMonthlyExpenseContainer = document.getElementById("PartnerMonthlyExpensesId");
	partnerMonthlyExpenseContainer.style.display = "block";
	showPartnerMonthlyExpenses = true;
}

function RemovePartnerMonthlyExpensesElement() {
	var addButton = document.getElementById("AddPartnerMonthlyExpensesId");
	var removeButton = document.getElementById("RemovePartnerMonthlyExpensesId");
	addButton.style.display = "block";
	removeButton.style.display = "none";
	var partnerMonthlyExpenseContainer = document.getElementById("PartnerMonthlyExpensesId");
	partnerMonthlyExpenseContainer.style.display = "none";
	showPartnerMonthlyExpenses = false;
}

function MortgageSliderChanged() {
	var mortgageSliderInput = document.getElementById("MortgageSliderInputId");
	var mortgageSliderSpan = document.getElementById("MortgageSliderSpanId");
	mortgageSliderSpan.innerText = "£" + GetUKCurrencyFormatForValue(mortgageSliderInput.value);
	CalculateMonthlyMortgagePayment();
}

function MortgageTermSliderChanged() {
	var mortgageTermSliderInput = document.getElementById("MortgageTermSliderInputId");
	var mortgageTermSliderSpan = document.getElementById("MortgageTermSliderSpanId");
	mortgageTermSliderSpan.innerText = mortgageTermSliderInput.value + " Years";
	CalculateMonthlyMortgagePayment();
}

function MortgageRateSliderChanged() {
	var mortgageRateSliderInput = document.getElementById("MortgageRateSliderInputId");
	var mortgageRateSliderSpan = document.getElementById("MortgageRateSliderSpanId");
	mortgageRateSliderSpan.innerText = mortgageRateSliderInput.value + "%";
	CalculateMonthlyMortgagePayment();
}

function CalculateMonthlyMortgagePayment() {
	var monthlyMortgagePaymentId = document.getElementById("MonthlyMortgagePaymentId");

	var mortgageRateValue = document.getElementById("MortgageRateSliderInputId").value;

	var mortgageTermValue = document.getElementById("MortgageTermSliderInputId").value;

	var mortgageValue = document.getElementById("MortgageSliderInputId").value;

	var totalMortgageCost = mortgageValue;
	var monthlyInterestRate = (mortgageRateValue / 100) / 12;
	var mortgageTermInMonths = mortgageTermValue * 12;

	monthlyMortgageRepayments = totalMortgageCost * (monthlyInterestRate * Math.pow((monthlyInterestRate + 1), mortgageTermInMonths)) / (Math.pow((1 + monthlyInterestRate), mortgageTermInMonths) - 1);

	monthlyMortgagePaymentId.innerText = "£" + GetUKCurrencyFormatForValue(monthlyMortgageRepayments);

	var monthlyInterestPaymentId = document.getElementById("MonthlyInterestOnlyPaymentId");
	var monthlyInterestPayment = (mortgageValue * (mortgageRateValue / 100)) / 12;
	monthlyInterestPaymentId.innerText = "£" + GetUKCurrencyFormatForValue(monthlyInterestPayment);
}

function AddPartnerSavings() {
	var addPartnerSavingsButton = document.getElementById("AddPartnerSavingsButtonId");
	var removePartnerSavingsButton = document.getElementById("RemovePartnerSavingsButtonId");

	addPartnerSavingsButton.style.display = "none";
	removePartnerSavingsButton.style.display = "block";

	var partnerLifeSavings = document.getElementById("PartnerLifeSavingsId");
	partnerLifeSavings.style.display = "block";
	showPartnerSavings = true;
}

function RemovePartnerSavings() {
	var addPartnerSavingsButton = document.getElementById("AddPartnerSavingsButtonId");
	var removePartnerSavingsButton = document.getElementById("RemovePartnerSavingsButtonId");

	addPartnerSavingsButton.style.display = "block";
	removePartnerSavingsButton.style.display = "none";

	var partnerLifeSavings = document.getElementById("PartnerLifeSavingsId");
	partnerLifeSavings.style.display = "none";
	showPartnerSavings = false;
}

function ShowEarningsSummary() {
	var combinedAnnualSalary = 0;
	var combinedAnnualBonus = 0;

	// Your monthly earnings
	var annualSalary = document.getElementById("SalaryInputId").value;
	var annualBonus = document.getElementById("SalaryBonusInputId").value;
	var monthlyEarnings = document.getElementById("MonthlyEarningsInputId").value;

	combinedAnnualSalary = GetNumberFromText(annualSalary);
	combinedAnnualBonus = GetNumberFromText(annualBonus);

	var annualSalaryCell = document.getElementById("AnnualSalaryCellId");
	annualSalaryCell.innerText = "£" + annualSalary;

	var annualBonusCell = document.getElementById("AnnualBonusCellId");
	annualBonusCell.innerText = "£" + annualBonus;

	var monthlyEarnigsCell = document.getElementById("MonthlyEarnignsCellId");
	monthlyEarnigsCell.innerText = "£" + monthlyEarnings;

	// Partner's monthly earnings
	var partnersMonthlyEarningsContainerId = document.getElementById("PartnersMonthlyEarningsContainerId");

	if (showPartnerEarnings) {
		partnersMonthlyEarningsContainerId.style.display = "block";

		var partnerAnnualSalary = document.getElementById("PartnerSalaryInputId").value;
		var partnerAnnualBonus = document.getElementById("PartnerSalaryBonusInputId").value;
		var partnerMonthlyEarnings = document.getElementById("PartnerMonthlyEarningsInputId").value;

		combinedAnnualSalary += GetNumberFromText(partnerAnnualSalary);
		combinedAnnualBonus += GetNumberFromText(partnerAnnualBonus);

		var partnerAnnualSalaryCell = document.getElementById("PartnerAnnualSalaryCellId");
		partnerAnnualSalaryCell.innerText = "£" + partnerAnnualSalary;

		var partnerAnnualBonusCell = document.getElementById("PartnerAnnualBonusCellId");
		partnerAnnualBonusCell.innerText = "£" + partnerAnnualBonus;

		var monthlyEarnigsCell = document.getElementById("PartnerMonthlyEarnignsCellId");
		monthlyEarnigsCell.innerText = "£" + partnerMonthlyEarnings;
	}
	else {
		partnersMonthlyEarningsContainerId.style.display = "none";
	}

	// House costs
	var houseCostInputElement = document.getElementById("HousePriceInputId").value;
	var houseDepositInputElement = document.getElementById("HouseDepositInputId").value;

	var propertyPriceCell = document.getElementById("PropertyPriceCellId");
	propertyPriceCell.innerText = "£" + houseCostInputElement;

	var depositCell = document.getElementById("DepositCellId");
	depositCell.innerText = "£" + houseDepositInputElement;

	DisplayMortgageAndDepositProgressBar();

	// Possible loan amount	
	var houseCostValue = document.getElementById("HousePriceInputId").value;
	var houseDepositValue = document.getElementById("HouseDepositInputId").value;

	var pLACell4x = document.getElementById("PLACell4x");
	pLACell4x.innerText = "£" + GetUKCurrencyFormatForValue((4 * combinedAnnualSalary));

	var pLAWDCell4x = document.getElementById("PLAWDCell4x");
	pLAWDCell4x.innerText = "£" + GetUKCurrencyFormatForValue((4 * combinedAnnualSalary) + GetNumberFromText(houseDepositValue));

	var pLACell45x = document.getElementById("PLACell45x");
	pLACell45x.innerText = "£" + GetUKCurrencyFormatForValue((4.5 * combinedAnnualSalary));

	var pLAWDCell45x = document.getElementById("PLAWDCell45x");
	pLAWDCell45x.innerText = "£" + GetUKCurrencyFormatForValue((4.5 * combinedAnnualSalary) + GetNumberFromText(houseDepositValue));

	// Possible loan amount with bonus
	var combinedSalaryWithBonus = combinedAnnualBonus + combinedAnnualSalary;

	var pLAWBCell4x = document.getElementById("PLAWBCell4x");
	pLAWBCell4x.innerText = "£" + GetUKCurrencyFormatForValue((4 * combinedSalaryWithBonus));

	var pLAWBWDCell4x = document.getElementById("PLAWBWDCell4x");
	pLAWBWDCell4x.innerText = "£" + GetUKCurrencyFormatForValue((4 * combinedSalaryWithBonus) + GetNumberFromText(houseDepositValue));

	var pLAWBCell45x = document.getElementById("PLAWBCell45x");
	pLAWBCell45x.innerText = "£" + GetUKCurrencyFormatForValue((4.5 * combinedSalaryWithBonus));

	var pLAWBWDCell45x = document.getElementById("PLAWBWDCell45x");
	pLAWBWDCell45x.innerText = "£" + GetUKCurrencyFormatForValue((4.5 * combinedSalaryWithBonus) + GetNumberFromText(houseDepositValue));

	// Loan information alert
	var loanAmountSpan = document.getElementById("LoanAmountInformationSpanId");
	var loanAmountAlert = document.getElementById("LoanAmountInformationAlertId");
	loanAmountSpan.innerHTML = "Based on the property price of <strong>£" + GetUKCurrencyFormatForValue(houseCostValue);

	var houseCostAfterDeposit = GetNumberFromText(houseCostValue) - GetNumberFromText(houseDepositValue);

	if (combinedSalaryWithBonus * 3.5 >= houseCostAfterDeposit
		|| combinedSalaryWithBonus * 4 >= houseCostAfterDeposit
		|| combinedSalaryWithBonus * 4.5 >= houseCostAfterDeposit) {
		loanAmountSpan.innerHTML += "</strong> you should be able to get a mortgage of "
		loanAmountSpan.innerHTML += "<strong>£" + GetUKCurrencyFormatForValue(houseCostAfterDeposit);
		loanAmountSpan.innerHTML += " with a deposit of <strong>£" + GetUKCurrencyFormatForValue(houseDepositValue) + "</strong>.";
		loanAmountAlert.setAttribute("class", "alert alert-success");
	}
	else {
		loanAmountSpan.innerHTML += " it might be tough to get a mortgage with the details you provided. Consider increasing your savings.";
		loanAmountAlert.setAttribute("class", "alert alert-danger");
	}
}

function DisplayMortgageAndDepositProgressBar() {
	var mortgageValueProgressBar = document.getElementById("MortgageValueProgressBarId");
	var depositValueProgressBar = document.getElementById("DepositValueProgressBarId");

	var houseCostValue = GetNumberFromText(document.getElementById("HousePriceInputId").value);
	var houseDepositValue = GetNumberFromText(document.getElementById("HouseDepositInputId").value);

	var mortgageValue = GetNumberFromText(houseCostValue) - GetNumberFromText(houseDepositValue);
	var mortgageValuePercentage = (mortgageValue / houseCostValue) * 100;

	var depositValuePercentage = 100 - mortgageValuePercentage;

	var houseCostsProgressBarContainer = document.getElementById("HouseCostProgressBarId");

	if (!isNaN(mortgageValuePercentage)
		&& !isNaN(depositValuePercentage)) {
		mortgageValuePercentage = Math.round(mortgageValuePercentage);
		depositValuePercentage = Math.round(depositValuePercentage);

		mortgageValueProgressBar.innerHTML = "<span>" + mortgageValuePercentage + "%</span>";
		mortgageValueProgressBar.setAttribute("aria-valuenow", mortgageValuePercentage);
		mortgageValueProgressBar.style.width = mortgageValuePercentage + "%";

		depositValueProgressBar.innerHTML = "<span>" + depositValuePercentage + "%</span>";
		depositValueProgressBar.setAttribute("aria-valuenow", depositValuePercentage);
		depositValueProgressBar.style.width = depositValuePercentage + "%";

		houseCostsProgressBarContainer.style.display = "block";

		var houseCostMortgageRequiredSpan = document.getElementById("HouseCostMortgageRequiredId");
		houseCostMortgageRequiredSpan.innerHTML = "You will need a mortgage of ";
		houseCostMortgageRequiredSpan.innerHTML += "<strong>£" + GetUKCurrencyFormatForValue(mortgageValue) + "</strong>";
		houseCostMortgageRequiredSpan.innerHTML += " with a deposit of";
		houseCostMortgageRequiredSpan.innerHTML += " <strong>£" + GetUKCurrencyFormatForValue(houseDepositValue) + "</strong>.";
	}
}

function CreateInformationPanel(parentElementId, innerHTML) {
	var parent = document.getElementById(parentElementId);
	var informationParentElement = document.createElement("div");
	var informationElement = document.createElement("div");
	informationElement.setAttribute("class", "alert alert-info");
	informationElement.innerHTML = innerHTML;
	informationParentElement.setAttribute("class", "col-md-12");

	informationParentElement.appendChild(informationElement);
	parent.appendChild(informationParentElement);
}

function GetMonthlyExpenseTotalForArray(items) {
	var monthlyTotal = 0;

	for (i = 0; i < items.length; i++) {
		var expenseElementValue = document.getElementById(items[i][0]);
		monthlyTotal += GetNumberFromText(expenseElementValue.value);
	}

	return monthlyTotal;
}

function ShowMonthlyExpensesForArray(items, elementId) {
	// Adding table with all monthly expenses
	var monthlyExpensesTable = document.createElement("table");
	monthlyExpensesTable.setAttribute("class", "summary-table");
	var monthlyTotal = 0;

	for (i = 0; i < items.length; i++) {
		var expenseElementValue = document.getElementById(items[i][0]);
		var expenseElementName = document.getElementById(items[i][1]);

		var monthlyExpensesRow = document.createElement("tr");
		var monthlyExpensesHeader = document.createElement("th");
		monthlyExpensesHeader.innerText = expenseElementName.value;
		var monthlyExpensesCell = document.createElement("td");
		monthlyExpensesCell.innerText = "£" + expenseElementValue.value;
		monthlyTotal += GetNumberFromText(expenseElementValue.value);

		monthlyExpensesRow.appendChild(monthlyExpensesHeader);
		monthlyExpensesRow.appendChild(monthlyExpensesCell);
		monthlyExpensesTable.appendChild(monthlyExpensesRow);
	}

	// Adding the monthly total row
	var monthlyExpensesTotalRow = document.createElement("tr");
	var monthlyExpensesTotalHeader = document.createElement("th");
	monthlyExpensesTotalHeader.innerText = "Total";
	var monthlyExpensesTotalCell = document.createElement("td");
	monthlyExpensesTotalCell.innerText = "£" + monthlyTotal;

	monthlyExpensesTotalRow.appendChild(monthlyExpensesTotalHeader);
	monthlyExpensesTotalRow.appendChild(monthlyExpensesTotalCell);
	monthlyExpensesTable.appendChild(monthlyExpensesTotalRow);

	var expensesElement = document.getElementById(elementId);
	expensesElement.appendChild(monthlyExpensesTable);
}

function ShowExpensesSummary() {

	var yourExpensesTotal = GetMonthlyExpenseTotalForArray(yourMonthlyExpensesArray);
	var partnerExpensesTotal = GetMonthlyExpenseTotalForArray(partnerMonthlyExpensesArray);

	// Your expense summary
	var yourTotalMonthlyExpensesCellId = document.getElementById("YourTotalMonthlyExpensesCellId");
	yourTotalMonthlyExpensesCellId.innerText = "£" + GetUKCurrencyFormatForValue(yourExpensesTotal);

	var monthlyEarnings = document.getElementById("MonthlyEarningsInputId").value;
	var yourTotalSalaryExpenseCellID = document.getElementById("YourTotalSalaryExpenseCellID");
	yourTotalSalaryExpenseCellID.innerText = "£" + GetUKCurrencyFormatForValue(monthlyEarnings);

	var yourTotalSalaryAfterExpenseCellId = document.getElementById("YourTotalSalaryAfterExpenseCellId");
	yourTotalSalaryAfterExpenseCellId.innerText = "£" + GetUKCurrencyFormatForValue(GetNumberFromText(monthlyEarnings) - yourExpensesTotal);

	// Your partner expense summary
	var partnersMonthlyExpensesContainerId = document.getElementById("PartnersMonthlyExpensesContainerId");
	var combinedMonthlyExpensesContainerId = document.getElementById("CombinedMonthlyExpensesContainerId");
	var partnerMonthlyEarnings = document.getElementById("PartnerMonthlyEarningsInputId").value;
	var combinedMonthlyEarnings = GetNumberFromText(partnerMonthlyEarnings) + GetNumberFromText(monthlyEarnings);
	var combinedTotalExpenses;

	if (showPartnerMonthlyExpenses) {
		partnersMonthlyExpensesContainerId.style.display = "block";
		combinedMonthlyExpensesContainerId.style.display = "block";
		var combinedTotalExpenses = yourExpensesTotal + partnerExpensesTotal;

		var partnersTotalMonthlyExpensesCellId = document.getElementById("PartnersTotalMonthlyExpensesCellId");
		partnersTotalMonthlyExpensesCellId.innerText = "£" + GetUKCurrencyFormatForValue(partnerExpensesTotal);

		var partnerTotalSalaryExpenseCellID = document.getElementById("PartnersTotalSalaryExpenseCellID");
		partnerTotalSalaryExpenseCellID.innerText = "£" + GetUKCurrencyFormatForValue(partnerMonthlyEarnings);

		var partnerTotalSalaryAfterExpenseCellId = document.getElementById("PartnersTotalSalaryAfterExpenseCellId");
		partnerTotalSalaryAfterExpenseCellId.innerText = "£" + GetUKCurrencyFormatForValue(GetNumberFromText(partnerMonthlyEarnings) - partnerExpensesTotal);

		var combinedTotalExpensesCellId = document.getElementById("CombinedTotalMonthlyExpensesCellId");
		combinedTotalExpensesCellId.innerText = "£" + GetUKCurrencyFormatForValue(combinedTotalExpenses);

		var combinedTotalSalaryExpenseCellID = document.getElementById("CombinedTotalSalaryExpenseCellID");
		combinedTotalSalaryExpenseCellID.innerText = "£" + GetUKCurrencyFormatForValue(combinedMonthlyEarnings);

		var combinedTotalSalaryAfterExpenseCellId = document.getElementById("CombinedTotalSalaryAfterExpenseCellId");
		combinedTotalSalaryAfterExpenseCellId.innerText = "£" + GetUKCurrencyFormatForValue(combinedMonthlyEarnings - combinedTotalExpenses);
	}
	else {
		partnersMonthlyExpensesContainerId.style.display = "none";
		combinedMonthlyExpensesContainerId.style.display = "none";
		combinedTotalExpenses = yourExpensesTotal;
	}

	var possibleTotalMonthlyCosts = 170;
	var possibleTotalMonthlyCostCellId = document.getElementById("PossibleTotalMonthlyCostCellId");
	possibleTotalMonthlyCostCellId.innerText = "£" + possibleTotalMonthlyCosts;

	var salaryAfterExpensesId = document.getElementById("SalaryAfterExpensesId");
	var salaryAfterExpensesAndMortgageId = document.getElementById("SalaryAfterExpensesAndMortgageId");
	var salaryAfterExpensesAndPotentialExpenses = document.getElementById("SalaryAfterExpensesAndPotentialExpenses");

	salaryAfterExpensesId.innerText = "£" + GetUKCurrencyFormatForValue(combinedMonthlyEarnings - combinedTotalExpenses);
	salaryAfterExpensesAndMortgageId.innerText = "£" + GetUKCurrencyFormatForValue(combinedMonthlyEarnings - combinedTotalExpenses - monthlyMortgageRepayments);

	var salaryAfterAllExpenses = combinedMonthlyEarnings - combinedTotalExpenses - monthlyMortgageRepayments - possibleTotalMonthlyCosts;
	salaryAfterExpensesAndPotentialExpenses.innerText = "£" + GetUKCurrencyFormatForValue(salaryAfterAllExpenses);

	var cannotAffordMonthlyExpensesId = document.getElementById("CannotAffordMonthlyExpensesId");
	var canAffordMonthlyExpensesId = document.getElementById("CanAffordMonthlyExpensesId");

	if (salaryAfterAllExpenses < 0) {
		cannotAffordMonthlyExpensesId.style.display = "block";
		canAffordMonthlyExpensesId.style.display = "none";
	}
	else {
		cannotAffordMonthlyExpensesId.style.display = "none";
		canAffordMonthlyExpensesId.style.display = "block";
	}
}

function ShowMortgageSliderSummary() {
	var mortgageSliderInput = document.getElementById("MortgageSliderInputId");
	var houseCostValue = GetNumberFromText(document.getElementById("HousePriceInputId").value);
	var houseDepositValue = GetNumberFromText(document.getElementById("HouseDepositInputId").value);

	mortgageSliderInput.setAttribute("min", houseDepositValue);
	mortgageSliderInput.setAttribute("max", houseCostValue);
	mortgageSliderInput.setAttribute("value", houseCostValue - houseDepositValue);
	MortgageSliderChanged();

	var mortgageTermSliderInputId = document.getElementById("MortgageTermSliderInputId");
	var mortgageRateSliderInputId = document.getElementById("MortgageRateSliderInputId");

	if (IsIE()) {
		mortgageSliderInput.setAttribute("onchange", "MortgageSliderChanged()");
		mortgageTermSliderInputId.setAttribute("onchange", "MortgageTermSliderChanged()");
		mortgageRateSliderInputId.setAttribute("onchange", "MortgageRateSliderChanged()");
	}
	else {
		mortgageSliderInput.setAttribute("oninput", "MortgageSliderChanged()");
		mortgageTermSliderInputId.setAttribute("oninput", "MortgageTermSliderChanged()");
		mortgageRateSliderInputId.setAttribute("oninput", "MortgageRateSliderChanged()");
	}
}

function InitialiseSavingsSummary() {
	var currentSavingsCellId = document.getElementById("CurrentSavingsCellId");
	var currentPartnerSavingsCellId = document.getElementById("CurrentPartnerSavingsCellId");
	var CurrentPartnerSavingsRowId = document.getElementById("CurrentPartnerSavingsRowId");
	var savingsAfterCostsCellId = document.getElementById("SavingsAfterCostsCellId");

	var savingsInputId = document.getElementById("SavingsInputId");
	var partnerSavingsInputId = document.getElementById("PartnerSavingsInputId");

	var partnerSavings = GetNumberFromText(partnerSavingsInputId.value);
	var yourSavings = GetNumberFromText(savingsInputId.value);

	var combinedSavings;

	if (showPartnerSavings) {
		var combinedSavings = yourSavings + partnerSavings;
		CurrentPartnerSavingsRowId.style.display = "table-row";
	}
	else {
		var combinedSavings = yourSavings;
		CurrentPartnerSavingsRowId.style.display = "none";
	}

	var possibleTotalCost = 2389;
	var possibleTotalCostCellId = document.getElementById("PossibleTotalCostCellId");
	possibleTotalCostCellId.innerText = "£" + GetUKCurrencyFormatForValue(possibleTotalCost);

	currentSavingsCellId.innerText = "£" + GetUKCurrencyFormatForValue(yourSavings);
	currentPartnerSavingsCellId.innerText = "£" + GetUKCurrencyFormatForValue(partnerSavings);
	savingsAfterCostsCellId.innerText = "£" + GetUKCurrencyFormatForValue(combinedSavings - GetNumberFromText(possibleTotalCost));

	var notEnoughSavingsAlertId = document.getElementById("NotEnoughSavingsAlertId");
	var savingsReachedAlertId = document.getElementById("SavingsReachedAlertId");

	if (combinedSavings < possibleTotalCost) {
		savingsReachedAlertId.style.display = "none";
		notEnoughSavingsAlertId.style.display = "block";
	}
	else {
		notEnoughSavingsAlertId.style.display = "none";
		savingsReachedAlertId.style.display = "block";
	}
}

function ShowSummary() {
	var showSummaryButtonId = document.getElementById("ShowSummaryButtonId");
	showSummaryButtonId.innerText = "Recalculate Summary";

	var recalculateButtonId = document.getElementById("RecalculateButtonId");
	recalculateButtonId.style.display = "block";

	var summaryParentContainerId = document.getElementById("SummaryParentContainerId");
	summaryParentContainerId.style.display = "block";

	ShowEarningsSummary();
	ShowMortgageSliderSummary();
	InitialiseSavingsSummary();
	ShowExpensesSummary();
}

function ShowScrollFunction() {
	var scrollToTopButton = document.getElementById("GoToTopOfThePageId");

	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		scrollToTopButton.style.display = "flex";
	}
	else {
		scrollToTopButton.style.display = "none";
	}
}

function GoToTopOfThePage() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function GoToStart() {
	var houseBackgroundElement = document.getElementById("HouseNavigationHeaderId");
	var startPosition = houseBackgroundElement.offsetTop + houseBackgroundElement.offsetHeight;
	document.body.scrollTop = startPosition;
	document.documentElement.scrollTop = startPosition;
}