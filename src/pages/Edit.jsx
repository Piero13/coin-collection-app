import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CoinForm from '../components/coins/CoinForm';
import CoinsTable from '../components/coins/CoinsTable';
import SearchBar from '../components/coins/SearchBar';
import SortSelect from '../components/coins/SortSelect';
import AppToast from '../components/common/AppToast';
import { getCoins } from '../api/coinService';

/**
 * Edit page (admin only)
 */
const Edit = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('recent');
    const [filteredCoins, setFilteredCoins] = useState([]);    
    const [toast, setToast] = useState({
        show: false,
        message: '',
        variant: 'success',
    });
    const [editingCoin, setEditingCoin] = useState(null);

    const showToast = (message, variant = 'success') => {
        setToast({ show: true, message, variant });
    };

    const fetchCoins = async () => {
        try {
            const data = await getCoins();
            setCoins(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <Container className="py-4 py-md-5 px-3 px-md-4 ">
            <h3 className="mb-4 fs-4 fs-md-3">Gestion des pièces</h3>

            <Row>
                <Col xs={12} md={6} lg={4}>
                    <CoinForm 
                        onSuccess={fetchCoins} 
                        showToast={showToast}
                        editingCoin={editingCoin}
                        setEditingCoin={setEditingCoin}
                    />
                </Col>

                <Col xs={12} md={6} lg={8}>
                    <SearchBar value={search} onChange={setSearch} />
                    <SortSelect value={sort} onChange={setSort} />
                    
                    <p className='text-center'>
                        {filteredCoins.length} / {coins.length} coins
                    </p>
                    
                    <CoinsTable 
                        coins={filteredCoins}
                        onRefresh={fetchCoins}
                        showToast={showToast}
                        setEditingCoin={setEditingCoin}
                        showActions={true}
                    />
                </Col>
            </Row>

            <AppToast
                show={toast.show}
                message={toast.message}
                variant={toast.variant}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </Container>
    );
};

export default Edit;