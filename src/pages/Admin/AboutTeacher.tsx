import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Camera, Save, X } from 'lucide-react';

export default function AboutTeacher() {
  const [formData, setFormData] = useState({
    name: 'Carlos Ochoa',
    title: 'Maestro',
    description: 'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent',
    profileImage: null as string | null
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos
    console.log('Guardando datos:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Resetear a los valores originales
    setFormData({
      name: 'Carlos Ochoa',
      title: 'Maestro',
      description: 'Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent',
      profileImage: null
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de Perfil</h1>
          <p className="text-gray-600">Edita tu información personal y ve el preview en tiempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Información del Perfil</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Camera size={16} />
                  Editar
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Imagen de perfil */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen de Perfil
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {formData.profileImage ? (
                      <img 
                        src={formData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="text-gray-400" size={24} />
                    )}
                  </div>
                  {isEditing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  )}
                </div>
              </div>

              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Título */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título/Profesión
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 text-white p-6">
              <h2 className="text-xl font-semibold mb-4">Preview del Perfil</h2>
              
              {/* Header oscuro como en la imagen original */}
              <div className="bg-gray-800 rounded-lg p-8 relative">
                {/* Redes sociales en la esquina superior derecha */}
                <div className="absolute top-4 right-4 flex gap-3">
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </div>

                <div className="flex items-start gap-6">
                  {/* Imagen de perfil */}
                  <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-gray-600">
                    {formData.profileImage ? (
                      <img 
                        src={formData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <Camera size={32} />
                        <div className="text-xs mt-2">{formData.name.split(' ').map(n => n[0]).join('')}</div>
                      </div>
                    )}
                  </div>

                  {/* Información del perfil */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {formData.name}
                    </h1>
                    <p className="text-gray-300 text-lg mb-4">
                      {formData.title}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {formData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección adicional del preview */}
            <div className="p-6 bg-gray-50">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Vista previa actualizada en tiempo real</p>
                <p>Los cambios que hagas en el formulario se reflejarán inmediatamente aquí.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}