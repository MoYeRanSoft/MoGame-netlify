//通过动画显示数字
function showNumberWihthAnimation(i,j,randNumber){
	//console.log(i,j,randNumber);
	var numberCell=$('#number-cell-'+i+'-'+j);  //#符号很容易被忽视 ID
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	var text = String(randNumber) //墨叶染千枝
	if (text == '2') {
		text = 'H';
	}
	if (text == '4') {
		text = 'He';
	}
	if (text == '8') {
		text = 'Li';
	}
	if (text == '16') {
		text = 'Be';
	}
	if (text == '32') {
		text = 'B';
	}
	if (text == '64') {
		text = 'C';
	}
	if (text == '128') {
		text = 'N';
	}
	if (text == '256') {
		text = 'O';
	}
	if (text == '512') {
		text = 'F';
	}
	if (text == '1024') {
		text = 'Ne';
	}
	if (text == '2048') {
		text = 'Na';
	}
	if (text == '4096') {
		text = 'Mg';
	}
	if (text == '8192') {
		text = 'Al';
	}

	numberCell.text(text);

	numberCell.animate({
		width:cellWidth,
		height:cellWidth,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},500);

}

//通过动画显示移动的效果
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);

}