class ExpresionGenerator {
    constructor(generator){
        this.rnd = generator;
        this.tick = 1;
        this.max  = {
            1 : 10,
            2 : 10,
            3 : 10,
        }
    }

    getExp(verify){


        this.tick++;

        let options = [
            'simplePlus'
        ];

        if (this.tick > 3)
        {
            options.push('simpleMinus');
        }

        if (this.tick > 10)
        {
            options.push('simpleMmultiply');
        }

        if (this.tick > 13)
        {
            options.push('simpleDiv');
        }

        let option = options[this.rnd.between(0, options.length-1)];

        return this[option](verify);
    }

    simplePlus(verify){

        if (this.tick > 3 && verify)
        {
            this.max[1] = this.max[1]+1;
        }

        let max = this.max[1];
        let first = this.rnd.between(0, max -1 ),
            second = this.rnd.between(0,max - first);

        if (second == 0 && first == 0)
        {
            second++
        }

        let result = verify ? first + second : this.rnd.between(1, max);
        if (!verify && result == first + second )
        {
            result++
        }

        return `${first} + ${second} = ${result}`;
    }


    simpleMinus(verify){

        if (this.tick > 6 && verify)
        {
            this.max[2] = this.max[2]+1;
        }

        let max = this.max[2];
        let first = this.rnd.between(1, max -1 ),
            second = this.rnd.between(0,max - first);

        if (second == 0 && first == 0)
        {
            first++
        }

        if (second > first)
        {
            first = second + 2;
        }

        let result = verify ? first - second : this.rnd.between(1, max);
        if (!verify && result == first - second )
        {
            result++
        }

        return `${first} - ${second} = ${result}`;
    }


    simpleMmultiply(verify){
        let max = this.max[3];
        let first = this.rnd.between(1, max  ),
            second = this.rnd.between(1,max );

        let result = verify ? first * second : this.rnd.between(1, max);
        if (!verify && result == first * second )
        {
            result++
        }
        return `${first} x ${second} = ${result}`;
    }

    simpleDiv(verify){
        let max = this.max[3];
        let first = this.rnd.between(1, max  ),
            second = this.rnd.between(1,max );

        let result = verify ? first * second : this.rnd.between(1, max);
        if (!verify && result == first * second )
        {
            result++
        }
        return `${result} / ${second} = ${first}`;
    }


}


export default ExpresionGenerator;