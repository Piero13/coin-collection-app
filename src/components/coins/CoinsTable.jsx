import { useState } from 'react';
import { Table, Card, Button, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteCoin } from '../../api/coinService';
import { deleteImage } from '../../api/storageService';
import CoinDetailModal from './CoinDetailModal';

/** Display coins list **/
const CoinsTable = ({ coins, showToast, onRefresh, setEditingCoin, showActions = false }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 25;

   const start = (currentPage - 1) * itemsPerPage;
   const paginatedCoins = coins.slice(start, start + itemsPerPage);

   const [selectedCoin, setSelectedCoin] = useState(null);
   const [showModal, setShowModal] = useState(null);

   const handleDelete = async (coin) => {
      if (!window.confirm('Supprimer cette pièce ?')) return;

      try {
         // 1. Delete image
         if (coin.image_url) {
            await deleteImage(coin.image_url);
         }

         // 2. Delete DB
         await deleteCoin(coin.id);

         showToast('Pièce supprimée !');
         await onRefresh();

      } catch (error) {
         console.error("Delete coin error: ",error);
         showToast('Erreur suppression pièce', 'danger');
      }
   };

   return (
      <>
         <Card className='border-primaryDark bg-gradient-darkmix'>
            <Card.Body className='p-2'>
               <h2 className='fs-5 text-center text-md-start mb-2'>Liste des pièces</h2>

               <div className="table-responsive">
                  <Table striped bordered hover className='border-primary'>
                     <thead>
                        <tr>
                           <th>Lieu</th>
                           <th>Modèle</th>
                           <th>Année</th>
                           {showActions && <th >Actions</th>}
                        </tr>
                     </thead>
                     <tbody>
                        {paginatedCoins.map((coin) => (
                        <tr 
                           key={coin.id}
                           onClick={() => {
                              setSelectedCoin(coin);
                              setShowModal(true);
                           }}
                           style={{ cursor: 'pointer' }}
                        >
                           <td>{coin.place}</td>
                           <td>{coin.model}</td>
                           <td>{coin.year}</td>
                           {showActions && <td className=' p-2'>
                              <div className='d-flex justify-content-center'>
                                 <Button
                                    className='me-2 ms-auto'
                                    variant="danger"
                                    size="m"
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       handleDelete(coin);
                                    }}
                                 >
                                    <FaTrash fill='#F8F9FB' />
                                 </Button>
                                 <Button
                                 className='me-auto'
                                    variant="warning"
                                    size="m"
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setEditingCoin(coin);
                                    }}
                                 >
                                    <FaEdit fill='#F8F9FB' />
                                 </Button>
                              </div>
                           </td>}
                        </tr>
                        ))}
                     </tbody>
                  </Table>
               </div>

            </Card.Body>

            <Card.Footer>
               {/* Pagination */}
               <Pagination>
                  {[...Array(Math.ceil(coins.length / itemsPerPage))].map((_, i) => (
                     <Pagination.Item
                        key={i}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{ cursor: 'pointer' }}
                     >
                        {i + 1}
                     </Pagination.Item>
                  ))}
               </Pagination>
            </Card.Footer>
         </Card>

         <CoinDetailModal
            show={showModal}
            coin={selectedCoin}
            onClose={() => setShowModal(false)}
         />
      </>
   );
};

export default CoinsTable;