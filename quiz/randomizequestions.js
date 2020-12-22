class RandomizeQuestions {
    static getRandomizedArray(array) {
        // bubble sort to randomize the array
        
        // this implementation is called Schwarztian transform, and
        // it's useful since we can perform the random permutation
        // on anything since we temporarily convert it into an object
        // regardless of what we're shuffling
        let randomizedArray = array
        // make it into an object, assign it a "random" sort value
            .map((a) => ({sort: Math.random(), value: a}))
        // sort them using the random sort key above
            .sort((a, b) => a.sort - b.sort)
        // "unmap" the actual item from the temporary object
            .map((a) => a.value)
        return randomizedArray;
    }
}

export default RandomizeQuestions