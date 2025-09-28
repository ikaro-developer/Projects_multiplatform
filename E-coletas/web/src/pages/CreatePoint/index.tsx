import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/services/api";

import { FiArrowLeft } from "react-icons/fi";
import { Logo } from "@/assets";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "./styles.css";
// import Dropzone from "@/components/Dropzone";

import useLocation from "@/utils/useLocation";
import useItems from "@/utils/useItems";
import useIBGE from "@/utils/useIBGE";
import useForm from "@/utils/useForm";
import { Success } from "@/components";

// ----------------- Componente -----------------
const CreatePoint = () => {
  const navigate = useNavigate();

  //sucess
  const [popupVisible, setPopupVisible] = useState(false);
  // Upload
  const [selectedFile, setSelectedFile] = useState<File>();

  // Itens
  const { items, selectedItems, toggleItem } = useItems();

  // UF/Cidade
  const {
    ufs,
    cities,
    selectedUf,
    selectedCity,
    handleSelectUf,
    handleSelectCity,
  } = useIBGE();
  // Formulário

  const { formData, handleInputChange } = useForm();

  // Localização inicial
  const { newLocation, LocationSelector } = useLocation();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, email, whatsapp } = formData;
    const { latitude, longitude } = newLocation;

    const data = {
      name,
      email,
      whatsapp,
      city: selectedCity,
      uf: selectedUf,
      latitude,
      longitude,
      items: selectedItems,
      // file: selectedFile ? selectedFile.name : null,
    };

    // 👉 Logar no console antes de enviar
    console.log("Dados do formulário:", data);
    // await api.post("/points", data);

    alert("Ponto de coleta criado");
    setPopupVisible(true);
  }

  // ----------------- Render -----------------
  return (
    <div id="page-create-point">
      <header>
        <img src={Logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        {/* <Dropzone onFileUploaded={setSelectedFile} /> */}

        {/* Dados */}
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="number"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Endereço */}
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer
            center={[newLocation.latitude, newLocation.longitude]}
            zoom={15}
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[newLocation.latitude, newLocation.longitude]} />
            <LocationSelector />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Selecione uma Cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Itens */}
        <fieldset>
          <legend>
            <h2>Ítens de Coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
      <Success
        visible={popupVisible}
        onClose={() => {
          setPopupVisible(false), navigate("/");
        }}
      />
    </div>
  );
};

export default CreatePoint;
