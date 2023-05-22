//通过动画显示数字
function showNumberWihthAnimation(i,j,randNumber){
	//console.log(i,j,randNumber);
	var numberCell=$('#number-cell-'+i+'-'+j);  //#符号很容易被忽视 ID
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	var text = String(randNumber) //墨叶染千枝
	if (text == '2') {
		text = '苏';
	}
	if (text == '4') {
		text = '芮';
	}
	if (text == '8') {
		text = '虽';
	}
	if (text == '16') {
		text = '然';
	}
	if (text == '32') {
		text = '还';
	}
	if (text == '64') {
		text = '不';
	}
	if (text == '128') {
		text = '困';
	}
	if (text == '256') {
		text = '但';
	}
	if (text == '512') {
		text = '是';
	}
	if (text == '1024') {
		text = '请';
	}
	if (text == '2048') {
		text = '早';
	}
	if (text == '4096') {
		text = '点';
	}
	if (text == '8192') {
		text = '睡';
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
