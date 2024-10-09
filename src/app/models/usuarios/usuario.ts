export interface Usuario {
    IdUsuario: number,
    Usuario: string,
    Clave: string,
    IdPersona: number,
    IdSede: number,
    TipoRol_idTipoRol: number,
    FechaAlta: string;
    FechaBaja: string | null;
}
  