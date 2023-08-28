/* eslint-disable prettier/prettier */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProductCategory from 'App/Models/ProductCategory'
import Subcategory from 'App/Models/Subcategory'

export default class extends BaseSeeder {
  public async run() {
    const ProductCategories = [
      {
        name: "Eletrônicos e Tecnologia",
        id: 1
      },
      {
        name: "Moda e Vestuário",
        id: 2
      },
      {
        name: "Casa e Decoração",
        id: 3
      },
      {
        name: "Beleza e Cuidados Pessoais",
        id: 4
      },
      {
        name: "Esportes e Atividades ao Ar Livre",
        id: 5
      },
      {
        name: "Saúde e Bem-Estar",
        id: 6
      },
      {
        name: "Brinquedos e Jogos",
        id: 7
      },
      {
        name: "Livros, Música e Entretenimento",
        id: 8
      },
      {
        name: "Alimentos e Bebidas",
        id: 9
      },
      {
        name: "Artes e Artesanato",
        id: 10
      },
      {
        name: "Autos e peças",
        id: 11
      },
      {
        name: "Serviços",
        id: 12
      },
    ]
    const subcategories = [
      {
        name: "Smartphones e acessórios",
        productCategoryId: 1
      },
      {
        name: "Computadores e laptops",
        productCategoryId: 1
      },
      {
        name: "Tablets e dispositivos eletrônicos",
        productCategoryId: 1
      },
      {
        name: "Acessórios eletrônicos (fones de ouvido, cabos, carregadores)",
        productCategoryId: 1
      },
      {
        name: "Roupas para homens, mulheres e crianças",
        productCategoryId: 2
      },
      {
        name: "Calçados",
        productCategoryId: 2
      },
      {
        name: "Acessórios de moda (bolsas, joias, relógios)",
        productCategoryId: 2
      },
      {
        name: "Móveis (sofás, mesas, cadeiras)",
        productCategoryId: 3
      },
      {
        name: "Decoração de interiores",
        productCategoryId: 3
      },
      {
        name: "Utensílios domésticos",
        productCategoryId: 3
      },
      {
        name: "Têxteis para casa (lençóis, cortinas, tapetes)",
        productCategoryId: 3
      },
      {
        name: "Cosméticos",
        productCategoryId: 4
      },
      {
        name: "Produtos para cuidados com a pele",
        productCategoryId: 4
      },
      {
        name: "Produtos para cuidados com os cabelos",
        productCategoryId: 4
      },
      {
        name: "Perfumes e fragrâncias",
        productCategoryId: 4
      },
      {
        name: "Equipamentos esportivos (bicicletas, raquetes, bolas)",
        productCategoryId: 5
      },
      {
        name: "Roupas e calçados esportivos",
        productCategoryId: 5
      },
      {
        name: "Acessórios para atividades ao ar livre",
        productCategoryId: 5
      },
      {
        name: "Vitaminas e suplementos",
        productCategoryId: 6
      },
      {
        name: "Equipamentos de exercício",
        productCategoryId: 6
      },
      {
        name: "Produtos para saúde mental e bem-estar",
        productCategoryId: 6
      },
      {
        name: "Brinquedos para todas as idades",
        productCategoryId: 7
      },
      {
        name: "Jogos de tabuleiro e quebra-cabeças",
        productCategoryId: 7
      },
      {
        name: "Livros físicos e eletrônicos",
        productCategoryId: 8
      },
      {
        name: "Música (CDs, vinis, downloads digitais)",
        productCategoryId: 8
      },
      {
        name: "Filmes e séries em DVD/Blu-ray ou formato digital",
        productCategoryId: 8
      },
      {
        name: "Alimentos gourmet",
        productCategoryId: 9
      },
      {
        name: "Bebidas (vinhos, cervejas, destilados, chás, cafés)",
        productCategoryId: 9
      },
      {
        name: "Produtos orgânicos e saudáveis",
        productCategoryId: 9
      },
      {
        name: "Suprimentos para artes (pintura, escultura, desenho)",
        productCategoryId: 10
      },
      {
        name: "Produtos artesanais únicos",
        productCategoryId: 10
      },
      {
        name: "Carros, vans e utilitários",
        productCategoryId: 11
      },
      {
        name: "Motos",
        productCategoryId: 11
      },
      {
        name: "Ônibus",
        productCategoryId: 11
      },
      {
        name: "Caminhões",
        productCategoryId: 11
      },
      {
        name: "Barcos e aeronaves",
        productCategoryId: 11
      },
      {
        name: "Peças e acessórios",
        productCategoryId: 11
      },
      {
        name: "Serviços domésticos",
        productCategoryId: 12
      },
      {
        name: "Outros",
        productCategoryId: 12
      },
      {
        name: "Babá",
        productCategoryId: 12
      },
      {
        name: "Eventos / Festas",
        productCategoryId: 12
      },
      {
        name: "Reparação / Conserto / Reforma",
        productCategoryId: 12
      },
      {
        name: "Saúde / Beleza",
        productCategoryId: 12
      },
      {
        name: "Informática",
        productCategoryId: 12
      },
      {
        name: "Tradução",
        productCategoryId: 12
      },
      {
        name: "Transporte / Mudanças",
        productCategoryId: 12
      },
      {
        name: "Profissionais liberais",
        productCategoryId: 12
      },
      {
        name: "Turismo",
        productCategoryId: 12
      },
    ]
    await ProductCategory.createMany(ProductCategories)
    await Subcategory.createMany(subcategories)
  }
}
