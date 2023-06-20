window.onload = function () {
	Calc();
	const Input_Contents = document.querySelectorAll('input');
	Input_Contents.forEach(input => input.addEventListener('change', Calc));
	const Select_Contents = document.querySelectorAll('select');
	Select_Contents.forEach(select => select.addEventListener('change', Calc));
	const Calculator = document.getElementById('Calculation');
	Calculator.addEventListener('click', Calc);
}

function Calc() {
	let ToTal_Augment_Potency = '1';
	let Total_Augment_Potency_Floor_Increase = '1';
	const Augment_Potency_Elements = document.getElementsByClassName('Augment_Potency');
	const Augment_Potency_Floor_Increase_Elements = document.getElementsByClassName('Augment_Potency_Floor_Increase');
	const Non_Augment_Potency_Elements = document.getElementsByClassName('Non_Augment_Potency');
	const Non_Augment_Potency_Floor_Increase_Elements = document.getElementsByClassName('Non_Augment_Potency_Floor_Increase');
	const Player_ATK = Math.round(450 * Math.pow(1.1, ((document.getElementById('Player_Level').value - 1) / 5)) + (document.getElementById('Player_Lv1_ATK').value - 450));
	const Enemy_DEF = document.getElementById('Enemy_Def').value.split(',')[0];
	const ATK_Limit = document.getElementById('Enemy_Def').value.split(',')[1];
	const WeaponVariance = document.getElementById('Weapon_Variance').value;
	const Fi_Addoon = (parseFloat(document.getElementById('Addon_Skill_Fi').value) / 100) + parseFloat(1);
	const FixaTermina = (parseFloat(document.getElementById('Fixa_Termina').value) / 100) + parseFloat(1);
	const CrispFoodBoost = (parseFloat(document.getElementById('Crisp_Food_Boost').value) / 100) + parseFloat(1);
	const Element_Weakness_Potency = 1.2;
	const Crt_Potency = 1.2;
	const PAMultiplier = parseFloat(document.getElementById('PA').value) / 100;
	for (let i = 0; i < Augment_Potency_Elements.length; i++) {
		ToTal_Augment_Potency = Math.round((ToTal_Augment_Potency * (parseFloat(100) + parseFloat(Augment_Potency_Elements[i].value)) / 100) * 100000) / 100000;
	};
	for (let i = 0; i < Augment_Potency_Floor_Increase_Elements.length; i++) {
		Total_Augment_Potency_Floor_Increase = Math.round((Total_Augment_Potency_Floor_Increase * ((parseFloat(100) + parseFloat(Augment_Potency_Floor_Increase_Elements[i].value)) / 100)) * 100000) / 100000;
	};
	let Total_Potency = ToTal_Augment_Potency;
	let Total_Potency_Floor_Increase = Total_Augment_Potency_Floor_Increase;
	for (let i = 0; i < Non_Augment_Potency_Elements.length; i++) {
		Total_Potency = ((Total_Potency * ((parseFloat(100) + parseFloat(Non_Augment_Potency_Elements[i].value)) / 100)) * 10000) / 10000;
	};
	for (let i = 0; i < Non_Augment_Potency_Floor_Increase_Elements.length; i++) {
		Total_Potency_Floor_Increase = ((Total_Potency_Floor_Increase * ((parseFloat(100) + parseFloat(Non_Augment_Potency_Floor_Increase_Elements[i].value)) / 100)) * 10000) / 10000;
	};
	Total_Potency = ((Total_Potency * ((parseFloat(100) + parseFloat(document.getElementById('Fixa_Attack').value)) / 100)) * 10000) / 10000;
	Potency.value = Math.floor((ToTal_Augment_Potency - 1) * 1000) / 10 + "%";
	if (parseFloat(Math.floor(Total_Augment_Potency_Floor_Increase * 1000 * WeaponVariance)) >= parseFloat(1000)) {
		document.getElementById('Potency_Floor_Increase').value = "100%";
	}
	else {
		document.getElementById('Potency_Floor_Increase').value = Math.floor(Total_Augment_Potency_Floor_Increase * 1000 * document.getElementById('Weapon_Variance').value) / 10 + "%～";
	};
	let WeaponATK;
	if ((Total_Augment_Potency_Floor_Increase * WeaponVariance) >= 1) {
		WeaponATK = parseFloat(document.getElementById('Weapon_ATK').value);
	}
	else {
		WeaponATK = Math.round(parseFloat(document.getElementById('Weapon_ATK').value) * Total_Augment_Potency_Floor_Increase * WeaponVariance);
	};
	let CrtWeaponATK = parseFloat(document.getElementById('Weapon_ATK').value);
	if ((Player_ATK + WeaponATK) >= ATK_Limit) {
		document.getElementById('Min_Result').value = Math.round(
			(ATK_Limit - Enemy_DEF) * Total_Potency * PAMultiplier / 5);
		document.getElementById('Element_Weakness_Min_Result').value = Math.round(
			(ATK_Limit - Enemy_DEF) * Total_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
		document.getElementById('Crt_Result').value = Math.round(
			(ATK_Limit - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * PAMultiplier / 5);
		document.getElementById('Element_Weakness_Crt_Result').value = Math.round
			((ATK_Limit - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
	}
	else {
		document.getElementById('Min_Result').value = Math.round(
			(WeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * PAMultiplier / 5);
		document.getElementById('Element_Weakness_Min_Result').value = Math.round(
			(WeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
		document.getElementById('Crt_Result').value = Math.round(
			(CrtWeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * PAMultiplier / 5);
		document.getElementById('Element_Weakness_Crt_Result').value = Math.round(
			(CrtWeaponATK + Player_ATK - Enemy_DEF) * Total_Potency * FixaTermina * Fi_Addoon * Crt_Potency * Element_Weakness_Potency * CrispFoodBoost * PAMultiplier / 5);
	};
}