const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async () => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })
    it("Should start with the favourite number of zero", async function () {
        //assert
        //expect
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        // assert.equal(currentValue.toString(), expectedValue)
        expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update favorite number after calling update function", async () => {
        // const currentValue = await simpleStorage.retrieve()
        // await simpleStorage.store(5)
        // const updatedValue = await simpleStorage.retrieve()
        // assert.notEqual(currentValue, updatedValue)

        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add the person detail", async () => {
        const transactionResponse = await simpleStorage.addPerson("Prabin", "8")
        await transactionResponse.wait(1)
        const peopleArrayLength = await simpleStorage.people(0)
        expect(peopleArrayLength.favoriteNumber.toString()).to.equal("8")
    })
})
