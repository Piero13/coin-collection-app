import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CoinsTable from '../components/coins/CoinsTable';
import SearchBar from '../components/coins/SearchBar';
import SortSelect from '../components/coins/SortSelect';
import { getCoins } from '../api/coinService';
import { generateCoinsPDF } from '../utils/pdfUtils';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('recent');

    useEffect(() => {
        const fetchCoins = async () => {
            const data = await getCoins();
            setCoins(data);
        };

        fetchCoins();
    }, []);

    useEffect(() => {
        const filterAndSort = () => {
            let data = [...coins];

            // 🔍 Search
            data = data.filter((coin) =>
            `${coin.place} ${coin.model} ${coin.year}`
                .toLowerCase()
                .includes(search.toLowerCase())
            );

            // 🔃 Sort
            switch (sort) {
            case 'place':
                data.sort((a, b) => a.place.localeCompare(b.place));
                break;
            case 'model':
                data.sort((a, b) => a.model.localeCompare(b.model));
                break;
            case 'year':
                data.sort((a, b) => b.year - a.year);
                break;
            default:
                data.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
            }

            setFilteredCoins(data);
        };

        filterAndSort();
    }, [coins, search, sort]);

    return (
        <Container className="pt-4 pt-md-5 px-3 px-md-4 d-flex flex-column">
            <SearchBar value={search} onChange={setSearch} />
            <SortSelect value={sort} onChange={setSort} />

            <p className='text-center'>
                {filteredCoins.length} / {coins.length}
            </p>

            <CoinsTable coins={filteredCoins} />

            <Button
                variant='primary'
                className='mt-3 mx-auto mx-lg-0 w-content border-primaryDark bs-dark'
                onClick={() => generateCoinsPDF(filteredCoins)}
            >
                Télécharger PDF
            </Button>
        </Container>
    );
};

export default Home;