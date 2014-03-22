// A integrer sur Phaser
function key() // récuère les inputs clavier et agis en conséquence
{
	window.onkeydown = function(event)
	{  
		//Prend les inputs clavier
		switch(event.keyCode)
		{
			case 37: 
				game.toucheGauche=1;
			break;

			case 38: 
				game.toucheHaut=1;
			break;

			case 39: 
				game.toucheDroite=1;
			break;

			case 40: 
				game.toucheBas=1;
			break;

			case 32:
				game.toucheTir = 1;
			break;
		}
	}

	window.onkeyup = function(event) // quand on relache la touche (up)
	{ 
		switch(event.keyCode)
		{
			case 37: 
				game.toucheGauche=0;
			break;

			case 38: 
				game.toucheHaut=0;
			break;

			case 39: 
				game.toucheDroite=0;
			break;

			case 40: 
				game.toucheBas=0;
			break;

			case 32: // space
				game.toucheTirUp = true;
				game.toucheTir = 0;
			break;
		}
	}

}