import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { baseUrl } from '../../feature/slicer/Slicer';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DeliverOrderImgModal = ({imageModal ,item,setImageModal}:any) => {
  console.log(item)
  const handleClose = () => setImageModal(false);

  return (
      <Modal
        open={imageModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <img src={baseUrl+item} alt="img"  className='w-full h-full'/>
        </Box>
      </Modal>
  );
}
export default DeliverOrderImgModal;