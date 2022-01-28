class countingArray {
    constructor(){
      if (localStorage.getItem("countingArray : "+selectedHabit) === null) {
        localStorage.setItem("countingArray : "+selectedHabit, "0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0");
      }
      countingArray.instance = this;
      this.MonthCountOfDays = localStorage.getItem("countingArray : "+selectedHabit).split('\n').map(function(x){
        return parseInt(x, 10);
      });
    }
    static getInstance(){
      if (!(countingArray.instance)|| (countingArray.instance != localStorage.getItem("countingArray : "+selectedHabit).split('\n'))){
      return new countingArray();
      }
      return countingArray.instance;
    } 
}
let selectedHabitArray = countingArray.getInstance();

class CountingStrategyManager
{
    constructor()
    {
        this._CountingStrategy = null; 
    }

    set CountingStrategy(countingStrategy)
    {
        this._CountingStrategy = countingStrategy;
    }
    count()
    {
        this._CountingStrategy.count();
    }

}

class CountByMonths
{
    count()
    {
       console.log(selectedHabitArray.MonthCountOfDays[indexMonth-1])
    }
}

class CountByYear
{
    count()
    {
        let sum = 0
        for (let i = 0; i < 12; i++) 
        {
          sum += selectedHabitArray.MonthCountOfDays[i]  
        }      
        console.log(sum)  
    }
}

const countingStrategyManager = new CountingStrategyManager();
const countByMonths = new CountByMonths();
const countByYear = new CountByYear();

countingStrategyManager.CountingStrategy = countByMonths;
countingStrategyManager.count();
countingStrategyManager.CountingStrategy = countByYear;
countingStrategyManager.count();
