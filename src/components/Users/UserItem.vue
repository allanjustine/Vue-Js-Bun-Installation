<script setup lang="ts">
import ModalItem from "../ModalItem.vue";
import ModalFooter from "../ModalFooter.vue";
import ModalHeader from "../ModalHeader.vue";
import ModalBody from "../ModalBody.vue";
import { onMounted, reactive, ref } from "vue";
import Swal from "sweetalert2";

const buttonRef = ref<HTMLButtonElement | null>(null);
const modalRef = ref<{ modalRefItem: HTMLDivElement | null }>({ modalRefItem: null });
const errors = reactive({
  name: "",
  email: "",
});
const open = ref(false);
const openEdit = ref(false);
const formState = reactive({
  id: 0,
  name: "",
  email: "",
});
const isLoading = ref(false);
const isLoadingDelete = ref<{ [key: number]: boolean }>({});

const users = reactive([
  {
    id: 1,
    name: "John Doe",
    email: "G6WYU@example.com",
    created_at: "2023-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "JANE@example.com",
    created_at: "2023-01-02",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "ALICE@example.com",
    created_at: "2023-01-03",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "BOB@example.com",
    created_at: "2023-01-04",
  },
]);

function toggleModal() {
  open.value = !open.value;
}

onMounted(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      modalRef?.value &&
      modalRef.value.modalRefItem &&
      !modalRef.value.modalRefItem.contains(event.target as Node) &&
      buttonRef.value &&
      !buttonRef.value.contains(event.target as Node)
    ) {
      open.value = false;
    }
  }

  document.addEventListener("click", handleClickOutside);
});

function handleSubmit() {
  isLoading.value = true;

  const isInvalid = Error({ state: formState });

  if (isInvalid) {
    isLoading.value = false;
    return;
  }

  if (isLoading.value) {
    const { id, ...rest } = formState;
    const submittedItems = {
      id: users.length + 1,
      created_at: String(new Date().toISOString().split("T")[0]),
      ...rest,
    };

    setTimeout(() => {
      isLoading.value = false;
      users.unshift(submittedItems);
      formState.name = "";
      formState.email = "";
      toggleModal();
      Swal.fire({
        icon: "success",
        title: "User added successfully",
        showConfirmButton: false,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "Close",
      });
    }, 3000);
  }
}

function Error({ state }: { state: typeof formState }) {
  errors.name = "";
  errors.email = "";

  let isInvalid = false;

  if (!state.name || state.name.length < 2) {
    errors.name = "Name is requred and should be at least 2 characters long";
    isInvalid = true;
  }

  if (!state.email || !/\S+@\S+\.\S+/.test(state.email)) {
    errors.email = "Email is required and should be a valid email address";
    isInvalid = true;
  }

  if (
    openEdit.value &&
    users.some(
      (user) => user.email.toLowerCase() === state.email.toLowerCase() && user.id !== state.id,
    )
  ) {
    errors.email = "Email already exists";
    isInvalid = true;
  }

  if (
    !openEdit.value &&
    users.some((user) => user.email.toLowerCase() === state.email.toLowerCase())
  ) {
    errors.email = "Email already exists";
    isInvalid = true;
  }

  return isInvalid;
}

function handleDelete(id: number) {
  isLoadingDelete.value = {
    ...isLoadingDelete.value,
    ...{
      [id]: true,
    },
  };
  setTimeout(() => {
    users.splice(
      users.findIndex((user) => user.id === id),
      1,
    );
    Swal.fire({
      icon: "success",
      title: "User deleted successfully",
      showConfirmButton: false,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: "Close",
    });
    isLoadingDelete.value = {
      ...isLoadingDelete.value,
      ...{
        [id]: false,
      },
    };
  }, 3000);
}

function handleOpenEdit(user: (typeof users)[0]) {
  openEdit.value = !openEdit.value;
  formState.name = user.name;
  formState.email = user.email;
  formState.id = user.id;
}

function handleUpdate() {
  isLoading.value = true;

  const isInvalid = Error({ state: formState });

  if (isInvalid) {
    isLoading.value = false;
    return;
  }

  if (isLoading.value) {
    const indexId = users.findIndex((user) => user.id === formState.id);
    setTimeout(() => {
      users[indexId] = {
        id: formState.id,
        name: formState.name,
        email: formState.email,
        created_at: String(new Date().toISOString().split("T")[0]),
      };
      isLoading.value = false;
      formState.name = "";
      formState.email = "";
      formState.id = 0;
      handleOpenEdit({ id: 0, name: "", email: "", created_at: "" });
      Swal.fire({
        icon: "success",
        title: "User updated successfully",
        showConfirmButton: false,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: "Close",
      });
    }, 3000);
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="mt-10 flex flex-col items-center">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-end"
        type="button"
        @click="toggleModal"
        ref="buttonRef"
      >
        Add User
      </button>
      <table class="border-collapse border border-gray-400 mt-2">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-3">ID</th>
            <th class="border border-gray-300 p-3">Name</th>
            <th class="border border-gray-300 p-3">Email</th>
            <th class="border border-gray-300 p-3">Created At</th>
            <th class="border border-gray-300 p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border border-gray-300 p-3">{{ user.id }}</td>
            <td class="border border-gray-300 p-3">{{ user.name }}</td>
            <td class="border border-gray-300 p-3">{{ user.email }}</td>
            <td class="border border-gray-300 p-3">{{ user.created_at }}</td>
            <td class="border border-gray-300 p-3">
              <button
                type="button"
                class="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
                @click="handleOpenEdit(user)"
              >
                Edit
              </button>
              <button
                type="button"
                @click="handleDelete(user.id)"
                class="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 ml-2"
                :disabled="isLoadingDelete[user.id]"
                :class="{ 'cursor-not-allowed bg-red-400': isLoadingDelete }"
              >
                <p :class="{ 'animate-bounce': isLoadingDelete[user.id] }">
                  {{ isLoadingDelete[user.id] ? "..." : "Delete" }}
                </p>
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="border border-gray-300 p-3 text-center text-gray-500">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalItem :open="open" ref="modalRef">
      <form @submit.prevent="handleSubmit">
        <ModalHeader :toggleModal="toggleModal">Add User</ModalHeader>
        <ModalBody>
          <div class="space-y-2">
            <div class="flex flex-col gap-1">
              <label for="name" class="font-bold text-gray-600 text-sm">Enter Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                v-model="formState.name"
                class="p-3 border border-blue-100 rounded-md focus:outline-blue-200"
              />
              <small class="text-red-500" v-if="errors.name">{{ errors.name }}</small>
            </div>
            <div class="flex flex-col gap-1">
              <label for="email" class="font-bold text-gray-600 text-sm">Enter Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                v-model="formState.email"
                class="p-3 border border-blue-100 rounded-md focus:outline-blue-200"
              />
              <small class="text-red-500" v-if="errors.email">{{ errors.email }}</small>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            ref="buttonRef"
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            @click="toggleModal"
          >
            Close
          </button>
          <button
            :disabled="isLoading"
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            :class="{ 'cursor-not-allowed bg-blue-400': isLoading }"
          >
            {{ isLoading ? "Submitting..." : "Submit" }}
          </button>
        </ModalFooter>
      </form>
    </ModalItem>
    <ModalItem :open="openEdit">
      <form @submit.prevent="handleUpdate">
        <ModalHeader :toggleModal="toggleModal">Edit User</ModalHeader>
        <ModalBody>
          <div class="space-y-2">
            <div class="flex flex-col gap-1">
              <label for="name" class="font-bold text-gray-600 text-sm">Enter Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                v-model="formState.name"
                class="p-3 border border-blue-100 rounded-md focus:outline-blue-200"
              />
              <small class="text-red-500" v-if="errors.name">{{ errors.name }}</small>
            </div>
            <div class="flex flex-col gap-1">
              <label for="email" class="font-bold text-gray-600 text-sm">Enter Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                v-model="formState.email"
                class="p-3 border border-blue-100 rounded-md focus:outline-blue-200"
              />
              <small class="text-red-500" v-if="errors.email">{{ errors.email }}</small>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            @click="handleOpenEdit({ id: 0, name: '', email: '', created_at: '' })"
          >
            Close
          </button>
          <button
            :disabled="isLoading"
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            :class="{ 'cursor-not-allowed bg-blue-400': isLoading }"
          >
            {{ isLoading ? "Updating..." : "Update" }}
          </button>
        </ModalFooter>
      </form>
    </ModalItem>
  </div>
</template>

<style scoped></style>
