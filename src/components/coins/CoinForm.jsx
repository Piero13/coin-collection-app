import { useState, useEffect, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FaCamera, FaFolderOpen } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import { useAuth } from '../../hooks/useAuth';
import { addCoin } from '../../api/coinService';
import { uploadImage } from '../../api/storageService';
import { getCroppedImg } from '../../utils/imageUtils';
import { updateCoin } from '../../api/coinService';
import CropModal from './CropModal';


/** Form to add a coin **/
const CoinForm = ({ onSuccess, showToast, editingCoin, setEditingCoin }) => {
   const { user } = useAuth();

   const [formData, setFormData] = useState({
      place: '',
      model: '',
      description: '',
      year: '',
   });

   const fileInputRef = useRef(null);

   /** States **/
   const [loading, setLoading] = useState(false);
   const [imageFile, setImageFile] = useState(null);
   const [preview, setPreview] = useState(null);
   const [showCrop, setShowCrop] =  useState(false);
   const [tempImage, setTempImage] = useState(null)

   useEffect(() => {
      if (editingCoin) {
         // eslint-disable-next-line react-hooks/set-state-in-effect
         setFormData({
            place: editingCoin.place,
            model: editingCoin.model,
            description: editingCoin.description,
            year: editingCoin.year,
         });

         setPreview(editingCoin.image_url);
      }
   }, [editingCoin]);

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const resetForm = () => {
      setFormData({
         place: '',
         model: '',
         description: '',
         year: '',
      });
   };

   const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      setTempImage(imageUrl);
      setShowCrop(true);
   };

   const handleCropDone = async (croppedArea) => {
      const croppedBlob = await getCroppedImg(tempImage, croppedArea);

      // Compression
      const compressedFile = await imageCompression(
         new File([croppedBlob], 'cropped.jpg', { type: 'image/jpeg' }),
         {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
         }
      );

      setImageFile(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));

   setShowCrop(false);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!imageFile && !editingCoin) {
         showToast('Image required', 'danger');
         return;
      }

      setLoading(true);

      try {
         let imageUrl = preview;

         // 🔥 Si nouvelle image sélectionnée → upload
         if (imageFile) {
            imageUrl = await uploadImage(imageFile, user.id);
         }

         if (editingCoin) {
            // UPDATE
            await updateCoin(editingCoin.id, {
            ...formData,
            year: parseInt(formData.year),
            image_url: imageUrl,
            });

            showToast('Pièce modifiée avec succès !');
            setEditingCoin(null);

         } else {
            // CREATE
            await addCoin({
            ...formData,
            year: parseInt(formData.year),
            user_id: user.id,
            image_url: imageUrl,
            });

            showToast('Pièce ajoutée avec succès !');
         }

         resetForm();
         setPreview(null);
         setImageFile(null);
         setTempImage(null);
         if (fileInputRef.current) {
            fileInputRef.current.value='';
         }
         onSuccess();
         setEditingCoin(null);

      } catch (error) {
         console.error(error);
         showToast('Erreur sauvegarde pièce', 'danger');
      }

      setLoading(false);
   };

   return (
      <section className='mb-4 mb-md-0'>
         <Card className='border-primaryDark'>
            <Card.Body>
            <h5 className='mb-3'>Ajouter une pièce</h5>

            <Form onSubmit={handleSubmit} className='d-flex flex-column'>
               <Form.Group className="mb-3">
                  <Form.Control
                  name="place"
                  placeholder="Place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                  className='border border-primary'
                  />
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Control
                  name="model"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className='border border-primary'
                  />
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Control
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className='border border-primary'
                  />
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Control
                  name="year"
                  type="number"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className='border border-primary'
                  />
               </Form.Group>

               <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>

                  {/* Camera (mobile) */}
                  <Form.Control
                     type="file"
                     accept="image/*"
                     capture="environment"
                     onChange={handleImageChange}
                     ref={fileInputRef}
                     style={{ display: 'none' }}
                  />

                  <Button
                     variant="light"
                     onClick={() => fileInputRef.current.click()}
                     className="d-flex align-items-center justify-content-center gap-2 w-50 w-md-auto mx-auto mx-md-0 border border-primaryDark bs-dark"
                  >
                     <FaCamera className='fs-3'/>
                     <p className='m-0 d-none d-lg-block'>Télécharger une image</p>
                  </Button>
               </Form.Group>

               {preview && (
                  <div className="mb-3 d-flex justify-content-center">
                     <img
                        src={preview}
                        alt="preview"
                        style={{ objectFit: 'cover' }}
                        className='w-15 rounded'
                     />
                  </div>
               )}

               <Button type="submit" disabled={loading} variant='primary' className='w-50 w-md-content mb-2 mx-auto mx-md-0 border border-primaryDark bs-dark '>
                  {loading 
                     ? 'Saving...' 
                     : editingCoin 
                        ? 'Modifier' 
                        : 'Ajouter'}
               </Button>
            </Form>
            </Card.Body>
         </Card>    
         
         {/* Crop modal */}
         <CropModal
            show={showCrop}
            image={tempImage}
            onClose={() => setShowCrop(false)}
            onCropDone={handleCropDone}
         />  
      </section>
   );
};

export default CoinForm;