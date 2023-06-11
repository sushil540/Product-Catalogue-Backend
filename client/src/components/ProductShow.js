import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ProductShow =(props) =>{
    const { product, toggle, modal } = props

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} style={{width:"18rem"}}>
                <ModalHeader 
                    toggle={toggle}>Product - <span className="text-primary">{product.name}</span></ModalHeader>
                    <ModalBody>
                        <h5> Price - {product.price}</h5> 
                    </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ProductShow