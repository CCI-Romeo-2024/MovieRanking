const calculateScore = (movie) => {
    const totalVotes = movie.likes + movie.dislikes;

    const likePercentage = (movie.likes / totalVotes) * 100
    const score = (likePercentage / 100) * 10
    return score.toFixed(1)
};

export default calculateScore