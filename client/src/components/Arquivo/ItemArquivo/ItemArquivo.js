import React from 'react';

import ManipuladoItem from '../ManipuladoItem/ManipuladoItem';
import OrcamentoItem from '../OrcamentoItem/OrcamentoItem';

const ItemArquivo = ({
    orcamentos,
    handleEditOrcamento,
    handleRemoveOrcamento,
    handleEditManipulado,
    handleRemoveManipulado,
    manipulados,
    toggleManip
}) => {
    return (
        <div>
            {toggleManip ? (
                <ManipuladoItem
                    manipulados={manipulados}
                    handleEditManipulado={handleEditManipulado}
                    handleRemoveManipulado={handleRemoveManipulado}
                />
            ) : (
                <OrcamentoItem
                    orcamentos={orcamentos}
                    handleEditOrcamento={handleEditOrcamento}
                    handleRemoveOrcamento={handleRemoveOrcamento}
                />
            )}
        </div>
    );
};

export default ItemArquivo;
