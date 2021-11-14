const movies = require("./data")

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
/* function getAllDirectors(arr) {
  return arr.filter((movie, index, array) => {
    index === array.indexOf(movie)
  }).map(movie => movie.director)
} */

const getAllDirectors = moviesArr => {
  return moviesArr.map( movie =>
    movie.director).filter( (director, index, array) => 
    index === array.indexOf(director))
}



// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
const howManyMovies = moviesArr => {
  return moviesArr.filter( movie => 
    movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).reduce((acc, movie) => acc+=1,0)
}



// Iteration 3: All scores average - Get the average of all scores with 2 decimals
const scoresAverage = moviesArr => {
  if (!moviesArr.length) {
    return 0
  }
  return +(moviesArr.reduce( (a,b) =>
   b.score ? a += b.score : a+=0,0) / moviesArr.length).toFixed(2)
}

// Iteration 4: Drama movies - Get the average of Drama Movies
const dramaMoviesScore = moviesArr => {


  const dramaMovies = moviesArr.filter( (elem, index, array) => 
  elem.genre.includes("Drama"))

  if (!dramaMovies.length) {return 0}
  return +(dramaMovies.reduce((acc, movie) => acc += movie.score, 0) / dramaMovies.length).toFixed(2)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
const orderByYear = moviesArr => {

  return moviesArr.map( movie => movie)
  .sort( (a, b) => {
      if (a.year - b.year === 0) {
         return a.title > b.title ? 1:-1
      }
      else {return a.year < b.year ? -1:1}
  }
  )
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
const orderAlphabetically = moviesArr => {
  return moviesArr.map(movie => movie).sort( (a,b) => 
    a.title < b.title ? -1:1)
    .filter( (movie, index) => index < 20)
    .map(movie => movie.title)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
const turnHoursToMinutes = moviesArr => {
  let result = moviesArr.map(movie => movie)

  result.forEach( movie => {
     let dur = movie.duration.split(" ")
     let mins = parseInt(dur[0])*60
     dur[1] ? mins += parseInt(dur[1]) : mins+=0
     movie.duration = mins
  })
  return result
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArr) {
  if (!moviesArr.length) {return null}

  result = {
    score: 0
  }

  years = []
  moviesArr.filter( movie => {
    years.includes(movie.year) ? '': years.push(movie.year)
  })

  years.forEach( year => {
    const moviesByYear = moviesArr.filter( movie => movie.year===year)
    scoreAvgByYear = scoresAverage(moviesByYear)
    if (scoreAvgByYear > result.score) {
      result.score = scoreAvgByYear
      result.year = year
    }
    else if (scoreAvgByYear === result.score) {
      if (year < result.year)  {
        result.score = scoreAvgByYear
        result.year = year
      }
    }
  })

  return `The best year was ${result.year} with an average score of ${result.score}`
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
