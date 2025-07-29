import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(r => r.json())
      .then(setStocks);
  }, []);

  const buyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const sellStock = (stockToSell) => {
    setPortfolio(portfolio.filter(stock => stock.id !== stockToSell.id));
  };

  const getSortedAndFilteredStocks = () => {
    let filteredStocks = filterBy === "All" ? stocks : stocks.filter(stock => stock.type === filterBy);
    
    if (sortBy === "Alphabetically") {
      return filteredStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
    } else {
      return filteredStocks.sort((a, b) => a.price - b.price);
    }
  };

  return (
    <div>
      <SearchBar sortBy={sortBy} setSortBy={setSortBy} filterBy={filterBy} setFilterBy={setFilterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={getSortedAndFilteredStocks()} onStockClick={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
