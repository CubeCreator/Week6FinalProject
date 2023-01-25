var expect = chai.expect;

describe('full deck', function() {
    it('generates a deck of 52 cards', function() {
// expect that an array of length 52 is created
        const deck = fullDeck();
        expect(deck).to.have.length(52);
    });
    it('does not contain any duplicates', function(){
        const deck = fullDeck();
        let checkedCards = []
//loop through all cards and check them against the prior ones.
        for (i = 0; i < deck.length; i++)
            expect(deck[i]).to.not.include(checkedCards)
            checkedCards += deck[i]
    })
})
