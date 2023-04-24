var nums = new Array();
var score=0;
var hasConflicted=new Array();
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function(){
	newgame();
});
function newgame(){
	if(documentWidth>500){
		containerWidth=500;
		cellWidth=100;
		cellSpace=20;
	}else{
		settingForMobile();
	}

	init();
	generateOneNumber();
	generateOneNumber();

}
function settingForMobile(){
	$('#header .wrapper').css('width',containerWidth);
	$('#grid-container').css('width',containerWidth-cellSpace*2);
	$('#grid-container').css('height',containerWidth-cellSpace*2);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',containerWidth*0.02);
	$('.grid-cell').css('width',cellWidth);
	$('.grid-cell').css('height',cellWidth);
	$('.grid-cell').css('border-radius',cellWidth*0.06);
}
function init(){
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	for(var i=0;i<4;i++){
		nums[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			nums[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	updateView();
	score=0;
	updateScore(score);
}
function updateView(){
	$('.number-cell').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell=$('#number-cell-'+i+'-'+j);
			if (nums[i][j]==0) {
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',getPosTop(i,j)+cellWidth*0.5);
				numberCell.css('left',getPosLeft(i,j)+cellWidth*0.5);
			}else{
				numberCell.css('width',cellWidth);
				numberCell.css('height',cellWidth);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
				numberCell.css('color',getNumberColor(nums[i][j]));
				numberCell.text(nums[i][j]);
			}
			hasConflicted[i][j]=false; 
			
			$('.number-cell').css('border-radius',cellWidth*0.06);
			$('.number-cell').css('font-size',cellWidth*0.5);
			$('.number-cell').css('line-height',cellWidth+'px');
		}
	}
}
function generateOneNumber(){
	
	if (nospace(nums)) {
		return;
	}
	var count=0;
	var temp=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count]=i*4+j;
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count); 
	var randx=Math.floor(temp[pos]/4);
	var randy=Math.floor(temp[pos]%4);
	var randNum=Math.random()<0.5?2:4;
	nums[randx][randy]=randNum;
	showNumberWihthAnimation(randx,randy,randNum);
}
$(document).keydown(function(event){
	event.preventDefault();
	switch(event.keyCode){
		case 37:
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		case 38:
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		case 39:
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		case 40:
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
			break;
		default:
			break;
	}
});
document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	var deltax=endx-startx;
	var deltay=endy-starty;
	if(Math.abs(deltax)<documentWidth*0.08 && Math.abs(deltay)<documentWidth*0.08){
		return;
	}
	if(Math.abs(deltax)>=Math.abs(deltay)){ 
		if(deltax>0){
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}else{
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}
	}else{

		if(deltay>0){
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}else{
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(IsGameOver,500);
			}
		}
	}

});
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){ 
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){
					if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums) ){
						
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						
						score+=nums[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;
						break;
					}
					}
				}
			}
		}
	setTimeout(updateView,200);
}
function moveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){
					if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){ 
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);	
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);
						hasConflicted[k][j]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);
}
function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){ 
			if(nums[i][j]!=0){
				for(var k=3;k>j;k--){
					if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums) ){
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						
						score+=nums[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						break;
					}
					}
				}
			}
		}
	setTimeout(updateView,200);
}
function moveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){ 
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j]  && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);
						hasConflicted[k][j]=true;
						break;
					}
				}	
			}
		}
	}
	setTimeout(updateView,200);
}
