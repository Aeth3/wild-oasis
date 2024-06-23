import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabin() {
//   const dispatch = useDispatch();
//   const { isOpenModal } = useSelector((store) => store.cabin);
//   return (
//     <div>
//       <Button onClick={() => dispatch(toggleForm(isOpenModal))}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => dispatch(toggleForm(isOpenModal))}>
//           <CreateCabinForm onCloseModal={() => dispatch(toggleForm(isOpenModal))} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
