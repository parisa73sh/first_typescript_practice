import { useSelector, useDispatch } from 'react-redux';
import { addCategory, deleteCategory } from '../redux/reducers/Reducers';
import { RootState } from '../redux/store';
import { useState } from 'react';
function Category_Manager() {
  const dispatch = useDispatch();
  const categories = useSelector((state:RootState) => state.transactions.categories);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim() || categories.includes(newCategory)) return;
    dispatch(addCategory(newCategory));
    setNewCategory('');
  };
  const handleDeleteCategory = (categoryToDelete:string) => {
    dispatch(deleteCategory(categoryToDelete));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4">
    <div className="bg-[#1f1d2b] rounded-2xl p-6 shadow-md w-full md:w-2/3 mx-auto">
      <h2 className="text-lg font-bold mb-4">مدیریت دسته‌بندی‌ها</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="نام دسته‌بندی جدید" className="flex-1 p-3 bg-[#2a2837] rounded-xl focus:outline-none" />
        <button onClick={handleAddCategory} className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-xl hover:brightness-110">افزودن</button>
      </div>
      <ul className="space-y-2 flex flex-row justify-between items-center">
        {categories.map((c, i) => (<li key={i} className="bg-[#2a2837] p-3 rounded-xl">
          {c}
          <button
              onClick={() => handleDeleteCategory(c)}
              className="bg-red-600 px-3 py-1 rounded-xl hover:brightness-110 text-white text-sm ml-6"
            >
              حذف
            </button>
        </li>)      
      )}
      </ul>
    </div>
    </div>
  );
}
export default Category_Manager;