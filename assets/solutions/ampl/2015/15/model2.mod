set INGREDIENTS;
set PROPERTIES;
set SCORE_PROPERTIES;
param ingredientProperties {INGREDIENTS, PROPERTIES};
param teaspoonLimit;
param caloriesTarget;

var teaspoonPerIngredient {INGREDIENTS} integer >= 0 default 25;
var totalTeaspoons = sum {i in INGREDIENTS} teaspoonPerIngredient[i]; 

var scorePerProperty {p in PROPERTIES} =
		sum {i in INGREDIENTS} ingredientProperties[i, p] * teaspoonPerIngredient[i];

var score = prod {p in SCORE_PROPERTIES} scorePerProperty[p];

subject to LimitTeaspoons: totalTeaspoons == teaspoonLimit;
subject to PositiveScores {p in SCORE_PROPERTIES}: scorePerProperty[p] >= 0;
subject to Calories: scorePerProperty['calories'] == caloriesTarget;

maximize MaxScore: score;