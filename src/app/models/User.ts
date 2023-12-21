
export class Role {
  RoleName: string;
  constructor(roleName: string) {
    this.RoleName = roleName;
  }
}

export class UserType {
  TypeName: string;
  Role: Role[];
  constructor(typeName: string, roles: Role[]) {
    this.TypeName = typeName;
    this.Role = roles;
  }
}

export class CartItem {
  ProductID: string;
  Size: string;
  Quantity: string;
  constructor(productID: string, size: string, quantity: string) {
    this.ProductID = productID;
    this.Size = size;
    this.Quantity = quantity;
  }
}

export class User {
  constructor(
  public FullName: string="",
  public Gender: string="",
  public DateOfBirth: string="",
  public Email: string="",
  public Phone: string="",
  public Image: string="",
  public UserName: string="",
  public Password: string="",
  public CreateDate: string="",
  public UserType: UserType,
  public Cart: CartItem[],
  public Order: string[],
  public Product: string[],
  public Address: string[],
  public Voucher: string[],
){}
}

