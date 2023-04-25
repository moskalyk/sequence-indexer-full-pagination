# sequence-indexer-full-pagination
The sequence indexer implements pagination in order to restrict the number of transactions returned per request. Therefore, we use a while loop in order to pass the `after` object parameter returned from each indexer request to advance the cursor to the next indexed transactions object list.
