//通过动画显示数字
function showNumberWihthAnimation(i,j,randNumber){
	//console.log(i,j,randNumber);
	var numberCell=$('#number-cell-'+i+'-'+j);  //#符号很容易被忽视 ID
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	var text = String(randNumber) //墨叶染千枝
	if (text == '2') {
		text = '陈';
	}
	if (text == '4') {
		text = '而';
	}
	if (text == '8') {
		text = '然';
	}
	if (text == '16') {
		text = '五';
	}
	if (text == '32') {
		text = '一';
	}
	if (text == '64') {
		text = '快';
	}
	if (text == '128') {
		text = '乐';
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