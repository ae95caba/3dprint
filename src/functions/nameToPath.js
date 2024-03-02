function nameToPath(name) {
  const normalizedName = name
    .toLowerCase()
    .normalize("NFD") // Normalizar para separar los caracteres diacríticos (tildes)
    .replace(/[\u0300-\u036f]/g, "") // Eliminar caracteres diacríticos
    .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales excepto espacios y guiones
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-") // Reemplazar guiones consecutivos con uno solo

  return normalizedName
}
module.exports = {
  nameToPath,
}
