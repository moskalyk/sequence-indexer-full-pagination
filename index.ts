// Works in both a Webapp (browser) or Node.js:
import { SequenceIndexerClient } from '@0xsequence/indexer'

const fullPagination = async () => {
    const txs: any = []
    const indexer = new SequenceIndexerClient('https://mumbai-indexer.sequence.app')

    // here we query the Joy contract address, but you can use any
    const contractAddress = '0xCF12932b8a7450664e5C5499A2819804C3c08FD4';

    const filter = {
        contractAddress: contractAddress,
    };

    // query Sequence Indexer for all token transaction history on Mumbai
    let txHistory = await indexer.getTransactionHistory({
        filter: filter,
        page: { pageSize: 10 }
    })

    txs.push(...txHistory.transactions)

    // if there are more transactions to log, proceed to paginate
    while(txHistory.page.more){  
        txHistory = await indexer.getTransactionHistory({
            filter: filter,
            page: { 
                pageSize: 10, 
                // use the after cursor from the previous indexer call
                after: txHistory!.page!.after! 
            }
        })
        txs.push(...txHistory.transactions)
    }

    return txs
}

(async () => {
    const txs = await fullPagination()
    console.log(txs)
    console.log(`returned ${txs.length} # of transaction(s)`)
})()