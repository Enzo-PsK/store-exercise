import React, { FC } from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from "react-router-dom";
import "./index.css";
import loadingGif from '../../assets/loading.gif'
import sortUp from '../../assets/sort-up.svg'
import sortDown from '../../assets/sort-down.svg'
import sort from '../../assets/sort.svg'
import monitor from '../../assets/monitor.svg'
import mouse from '../../assets/mouse.svg'
import mousepad from '../../assets/mousepad.svg'
import keyboard from '../../assets/keyboard.svg'

interface HomeProps {

}
interface Item {
  name: string;
  price: string;
  type: string;
}

const Home: FC<HomeProps> = () => {
  const baseUrl = "http://localhost:8081";
  const [error, setError] = useState(false);
  const [lastFetchedData, setLastFetchedData] = useState<Item[]>([]);
  const [data, setData] = useState<Item[]>([]);
  const [types, setTypes] = useState<Item[]>([]);
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sortOption, setSortOption] = useState("None");
  const [sortSrc, setSortSrc] = useState(sort);
  const [queryString, setQueryString] = useState("");
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await fetch(`${baseUrl}/store/parts/`);
      if (!response.ok) {
        setError(true)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const data = await response.json();

      setLastFetchedData(data)
      setData(data)
      setLoading(false)
    } catch (err) {
      setError(true);
    }
  }
  async function getTypes() {
    try {
      const response = await fetch(`${baseUrl}/store/part-types/`);
      if (!response.ok) {
        setError(true)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const types = await response.json();
      setTypes(types)
    } catch (err) {
      console.log(err)
    }
  }

  function orderByPrice(data: Array<Item>, orderBy: "ascending" | "descending") {
    const sortedData = [...data]
    if (loading) return
    if (orderBy === "ascending") {
      sortedData.sort((a: Item, b: Item) => parseFloat(a.price) - parseFloat(b.price))
    }
    if (orderBy === "descending") {
      sortedData.sort((a: Item, b: Item) => parseFloat(b.price) - parseFloat(a.price))
    }
    setData(sortedData)
  }

  function changeActiveType(target: any) {
    const newType = target.getAttribute("data-value");
    let filteredData;
    if (newType === "All Types") {
      filteredData = lastFetchedData
    } else {
      if (data === lastFetchedData) {
        filteredData = data.filter((item: Item) => item.type === newType);
      } else {
        filteredData = lastFetchedData.filter((item: Item) => item.type === newType);
      }
    }
    setSortSrc(sort)
    setSortOption("None")
    setTypeFilter(newType)
    setData(filteredData)
  }

  function handleSort(target: any) {
    if (sortOption === "None") {
      setSortOption("Up");
      setSortSrc(sortUp)
      orderByPrice(data, "ascending")
    }
    if (sortOption === "Up") {
      setSortOption("Down");
      setSortSrc(sortDown)
      orderByPrice(data, "descending")
    }
    if (sortOption === "Down") {
      setSortOption("Up");
      setSortSrc(sortUp)
      orderByPrice(data, "ascending")
    }
  }

  function querySearch() {
    const filteredData = lastFetchedData.filter((item: Item) => {
      if (typeFilter === "All Types") {
        return item.name.toLowerCase().includes(queryString);
      }
      else {
        return item.type === typeFilter && item.name.toLowerCase().includes(queryString);
      }
    });
    setData(filteredData)
  }

  useEffect(() => {
    getData();
    getTypes();
  }, []);
  useEffect(() => {
    querySearch();
  }, [queryString]);

  return (
    <>
      <Header active="Home"></Header>
      <div className="bg-light">
        <Container className="bg-light text-muted">
          <div className="filter my-4">
            <input className=" w-50" onChange={(event) => setQueryString(event.target.value)} value={queryString} type="text" placeholder="Search product name" />
            <div className="options-box">
              <DropdownButton
                as={ButtonGroup}
                key="primary"
                id="dropdown-variants-primary"
                variant="primary"
                title={typeFilter}
              >
                <Dropdown.Item data-value="All Types" active={"All Types" === typeFilter} eventKey="1" onClick={(event) => changeActiveType(event.target)}>All Types</Dropdown.Item>
                {types.map((type, index) => {
                  return (
                    <Dropdown.Item active={String(type) === typeFilter} data-value={type} eventKey={index} key={index} onClick={(event) => changeActiveType(event.target)}>
                      <>{type}</>
                    </Dropdown.Item>
                  )
                })}
              </DropdownButton>
              <Button className="ml-2" variant="light" data-sort={sortOption} onClick={(event) => handleSort(event.target)}>
                <img width="20" height="20" src={sortSrc} alt="" />
              </Button>
            </div>
          </div>
          {loading ?
            <div className="loading-div">
              <img src={loadingGif} alt="Loading Gif"></img>
            </div> : ""}
          <div className="cards-grid">
            {data.map((item, index) => {
              let iconSource;
              if(item.type === "Mouse") iconSource = mouse;
              if(item.type === "Monitor") iconSource = monitor;
              if(item.type === "Mousepad") iconSource = mousepad;
              if(item.type === "Keyboard") iconSource = keyboard;
              return (
                <Card className="text-center py-4" key={index} style={{ width: '18rem' }}>
                  <Card.Img width="40" height="40" variant="top" src={iconSource} />
                  <Card.Body>
                    <Card.Title className="text-center">{item.name}</Card.Title>
                    <Card.Text className="text-center">
                      {item.type}
                    </Card.Text>
                    <Link to={`/Parts/?name=${encodeURIComponent(item.name)}&type=${encodeURIComponent(item.type)}&price=${encodeURIComponent(item.price)}`}>
                      <Button variant="primary">{item.price}</Button>
                    </Link>
                  </Card.Body>
                </Card>)
            })}
          </div>
          {error ? <h2>An error ocurred! Please try again.</h2> : ""}
        </Container>
      </div>

    </>
  );
}

export default Home;
