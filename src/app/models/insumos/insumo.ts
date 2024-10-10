export interface Insumo {
    IdInsumos: number;
    NombreInsumo: string;
    Descripcion: string;
    FechaAlta: string;
    FechaBaja: string | null;
    Codigo: string;
    Cantidad: number;
    Marca: string;
    Observacion: string;
    IdTipoInsumo: number;
    IdCondicionInsumo: number;
    IdEstado: number;
    Ubicacion_Sedes_IdSedes: number;
  }
  